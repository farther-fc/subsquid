import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Position} from "./position.model"

@Entity_()
export class Pool {
    constructor(props?: Partial<Pool>) {
        Object.assign(this, props)
    }

    /**
     *  Smart contract address of the pool 
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
     *  All positions in this market 
     */
    @OneToMany_(() => Position, e => e.pool)
    positions!: Position[]
}
