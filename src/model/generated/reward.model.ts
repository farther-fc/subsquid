import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, ManyToOne as ManyToOne_, Index as Index_} from "@subsquid/typeorm-store"
import {Account} from "./account.model"

@Entity_()
export class Reward {
    constructor(props?: Partial<Reward>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    createdTimestamp!: bigint

    @BigIntColumn_({nullable: false})
    createdBlock!: bigint

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    account!: Account
}
