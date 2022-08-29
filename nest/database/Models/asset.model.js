import {Column, Model, Table, DataType, HasMany, BelongsTo, ForeignKey, HasOne} from 'sequelize-typescript';
import {Trait} from './trait.model';
import {TraitValue} from './traitValue.model';
import {Event} from './event.model';
import {Collection} from './collection.model';
import {OriginalCollection} from "./originalCollection.model";
import {CollectionListValues} from "./collectionListValues.model";

@Table({tableName: 'assets', timestamps: false})
export class Asset extends Model {
	@HasOne(() => CollectionListValues)
	collection_list_values;

	@ForeignKey(() => Collection)
	@Column({
		type: DataType.INTEGER
	})
	collection_id;

	@BelongsTo(() => Collection)
	collection;

	@ForeignKey(() => OriginalCollection)
	@Column({
		type: DataType.INTEGER
	})
	original_collection_id;

	@BelongsTo(() => OriginalCollection)
	original_collection;

	@HasMany(() => Event)
	events;

	@HasMany(() => TraitValue)
	trait_values;

	@Column({
		type: DataType.STRING
	})
	name;

	@Column({
		type: DataType.STRING
	})
	image_url;

	@Column({
		type: DataType.STRING
	})
	contract;

	@Column({ allowNull: false, type: DataType.INTEGER })
	token_id;

	@Column({
		type: DataType.STRING
	})
	owner_address;
}
