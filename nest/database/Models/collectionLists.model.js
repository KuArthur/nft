import {Column, Model, Table, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { Collection } from './collection.model';
import { Event } from './event.model';

@Table({
    tableName: 'collection_lists',
    timestamps: false
})
export class CollectionLists extends Model {
    @ForeignKey(() => Collection)
    @Column({ allowNull: false, type: DataType.INTEGER })
    collection_id;

    @BelongsTo(() => Collection)
    collection;


    @ForeignKey(() => Event)
    @Column({ allowNull: false, type: DataType.INTEGER })
    event_id;

    @BelongsTo(() => Event)
    event;
}
