import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, ManyToOne as ManyToOne_, Index as Index_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"
import {Account} from "./account.model"
import {Pool} from "./pool.model"

@Entity_()
export class Position {
    constructor(props?: Partial<Position>) {
        Object.assign(this, props)
    }

    /**
     * NonfungiblePositionManager tokenId
     */
    @PrimaryColumn_()
    id!: string

    /**
     *  Creation timestamp 
     */
    @BigIntColumn_({nullable: false})
    createdTimestamp!: bigint

    /**
     *  Creation block number 
     */
    @BigIntColumn_({nullable: false})
    createdBlock!: bigint

    /**
     *  Account that owns this position (staker contract is ignored, so its always the account that held it most recently other than the staker)
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    owner!: Account

    /**
     *  The liquidity pool in which this position was opened 
     */
    @Index_()
    @ManyToOne_(() => Pool, {nullable: true})
    pool!: Pool

    /**
     *  Whether this position is staked in a reward program
     */
    @Index_()
    @BooleanColumn_({nullable: true})
    isStaked!: boolean | undefined | null

    /**
     *  Whether this position is currently being held by the staker contract. This doesn't necessarily mean that the position is staked.
     */
    @Index_()
    @BooleanColumn_({nullable: true})
    isHeldByStaker!: boolean | undefined | null
}
