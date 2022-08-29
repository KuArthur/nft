import {Column, Model, Table, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {Asset} from "./asset.model";
import {Trait} from "./trait.model";

@Table({tableName: 'trait_values',timestamps: false})
export class TraitValue extends Model {
    @ForeignKey(() => Trait)
    @Column({ type: DataType.INTEGER })
    trait_id

    @BelongsTo(() => Trait)
    trait;

    @BelongsTo(() => Asset)
    asset;

    @ForeignKey(() => Asset)
    @Column({ type: DataType.INTEGER })
    asset_id

    @Column({ type: DataType.STRING })
    type;

    @Column({ type: DataType.STRING })
    value;

    @Column({ type: DataType.INTEGER })
    count;
}
