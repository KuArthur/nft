import { Column, Model, Table, BelongsTo, HasMany, BelongsToMany, ForeignKey, DataType } from 'sequelize-typescript';
import {Collection} from "./collection.model";
import { TraitValue } from './traitValue.model';
import {Asset} from "./asset.model";
import {OriginalCollection} from "./originalCollection.model";

@Table({tableName: 'traits', timestamps: false})
export class Trait extends Model {
    @ForeignKey(() => Collection)
    @Column({ type: DataType.INTEGER})
    collection_id;

    @BelongsTo(() => Collection)
    collection;

    @HasMany(() => TraitValue)
    trait_values;

    @Column({ type: DataType.STRING})
    type;
}
