module.exports = class Data1713725003636 {
    name = 'Data1713725003636'

    async up(db) {
        await db.query(`CREATE TABLE "pool" ("id" character varying NOT NULL, "created_timestamp" numeric NOT NULL, "created_block" numeric NOT NULL, CONSTRAINT "PK_db1bfe411e1516c01120b85f8fe" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "position" ("id" character varying NOT NULL, "created_timestamp" numeric NOT NULL, "created_block" numeric NOT NULL, "is_staked" boolean, "owner_id" character varying, "pool_id" character varying, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_8134902075edc5e996ec0d7172" ON "position" ("owner_id") `)
        await db.query(`CREATE INDEX "IDX_128820371117dcf3915dc01ad3" ON "position" ("pool_id") `)
        await db.query(`CREATE INDEX "IDX_a77d7d4702cccae5d55d6677d1" ON "position" ("is_staked") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "reward" ("id" character varying NOT NULL, "created_timestamp" numeric NOT NULL, "created_block" numeric NOT NULL, "amount" numeric NOT NULL, "account_id" character varying, CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_4a8843fdb7840bfd00f8e4f7b3" ON "reward" ("account_id") `)
        await db.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_8134902075edc5e996ec0d71722" FOREIGN KEY ("owner_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_128820371117dcf3915dc01ad30" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "pool"`)
        await db.query(`DROP TABLE "position"`)
        await db.query(`DROP INDEX "public"."IDX_8134902075edc5e996ec0d7172"`)
        await db.query(`DROP INDEX "public"."IDX_128820371117dcf3915dc01ad3"`)
        await db.query(`DROP INDEX "public"."IDX_a77d7d4702cccae5d55d6677d1"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP TABLE "reward"`)
        await db.query(`DROP INDEX "public"."IDX_4a8843fdb7840bfd00f8e4f7b3"`)
        await db.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_8134902075edc5e996ec0d71722"`)
        await db.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_128820371117dcf3915dc01ad30"`)
        await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36"`)
    }
}
