import { Column, HasMany, HasOne, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import {Asset} from "./asset.model";
import {Event} from "./event.model";
import {Trait} from "./trait.model";
import { Collection } from './collection.model';

@Table({tableName: 'original_collections', timestamps: false})
export class OriginalCollection extends Model {
    @HasOne(() => Collection)
    collection;

    @ForeignKey(() => OriginalCollection)
    @Column({
        type: DataType.INTEGER
    })
    collection_id;

    @HasMany(() => Asset)
    assets;

    @HasMany(() => Event)
    events;

    @Column({
        type: DataType.STRING
    })
    name;

    @Column({
        type: DataType.STRING
    })
    contract;

    @Column({
        type: DataType.STRING,
        unique: true,
    })
    slug;

    @Column({
        type: DataType.FLOAT
    })
    total_volume;

    @Column({
        type: DataType.INTEGER
    })
    items_count;

    @Column({
        type: DataType.INTEGER
    })
    priority;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    setting_listener;
}
