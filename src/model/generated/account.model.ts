import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
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
     *  All positions that belong to this account 
     */
    @OneToMany_(() => Position, e => e.owner)
    positions!: Position[]
}
