import {Column, Model, Table, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { Collection } from './collection.model';
import { Asset } from './asset.model';


@Table({
    tableName: 'collection_list_values',
    timestamps: false
})
export class CollectionListValues extends Model {
    @ForeignKey(() => Collection)
    @Column({ allowNull: false, type: DataType.INTEGER })
    collection_id;

    @BelongsTo(() => Collection)
    collection;

    @ForeignKey(() => Asset)
    @Column({ allowNull: false, type: DataType.INTEGER, primaryKey: true })
    asset_id;

    @BelongsTo(() => Asset)
    asset;

    @Column({ type: DataType.FLOAT, allowNull: true })
    price;
}
