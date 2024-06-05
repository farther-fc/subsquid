module.exports = class Data1717469302677 {
    name = 'Data1717469302677'

    async up(db) {
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "rewards_claimed" numeric, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "position" ("id" character varying NOT NULL, "created_timestamp" numeric NOT NULL, "created_block" numeric NOT NULL, "liquidity" numeric NOT NULL, "amount0" numeric NOT NULL, "amount1" numeric NOT NULL, "is_staked" boolean, "is_held_by_staker" boolean, "owner_id" character varying, "pool_id" character varying, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_8134902075edc5e996ec0d7172" ON "position" ("owner_id") `)
        await db.query(`CREATE INDEX "IDX_128820371117dcf3915dc01ad3" ON "position" ("pool_id") `)
        await db.query(`CREATE INDEX "IDX_a77d7d4702cccae5d55d6677d1" ON "position" ("is_staked") `)
        await db.query(`CREATE INDEX "IDX_32efaf81b2c23ffb1154f02147" ON "position" ("is_held_by_staker") `)
        await db.query(`CREATE TABLE "pool" ("id" character varying NOT NULL, "created_timestamp" numeric NOT NULL, "created_block" numeric NOT NULL, CONSTRAINT "PK_db1bfe411e1516c01120b85f8fe" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_8134902075edc5e996ec0d71722" FOREIGN KEY ("owner_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_128820371117dcf3915dc01ad30" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP TABLE "position"`)
        await db.query(`DROP INDEX "public"."IDX_8134902075edc5e996ec0d7172"`)
        await db.query(`DROP INDEX "public"."IDX_128820371117dcf3915dc01ad3"`)
        await db.query(`DROP INDEX "public"."IDX_a77d7d4702cccae5d55d6677d1"`)
        await db.query(`DROP INDEX "public"."IDX_32efaf81b2c23ffb1154f02147"`)
        await db.query(`DROP TABLE "pool"`)
        await db.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_8134902075edc5e996ec0d71722"`)
        await db.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_128820371117dcf3915dc01ad30"`)
    }
}
