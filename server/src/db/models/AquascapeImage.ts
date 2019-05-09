import {Table, Column, Model, ForeignKey, BelongsTo, HasMany, Default} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {Comment} from 'db/models/Comment'

@Table
export class AquascapeImage extends Model<AquascapeImage> {
    @Default(false)
    @Column
    mainImage: boolean

    @Column
    title: string

    @Column
    description: string

    @Column
    likes: number

    @Column
    gridSize: number

    @Column
    gridPosition: number

    @Column
    url: string

    @HasMany(() => Comment)
    comments: Comment[]

    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @BelongsTo(() => Aquascape)
    aquascape: Aquascape
}