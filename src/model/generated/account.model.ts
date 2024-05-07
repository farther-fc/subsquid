import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Position} from "./position.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    /**
     *  { Account address } 
     */
    @PrimaryColumn_()
    id!: string

    /**
     *  Total liquidity rewards claimed by this account
     */
    @BigIntColumn_({nullable: true})
    rewardsClaimed!: bigint | undefined | null

    /**
     *  All positions that belong to this account 
     */
    @OneToMany_(() => Position, e => e.owner)
    positions!: Position[]
}
