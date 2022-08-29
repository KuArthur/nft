import { Column, HasMany, HasOne, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import {Asset} from "./asset.model";
import {Event} from "./event.model";
import {Trait} from "./trait.model";
import { OriginalCollection } from './originalCollection.model';
import {CollectionListValues} from "./collectionListValues.model";
import {CollectionLists} from "./collectionLists.model";
import { CollectionStat } from './collectionStat.model';

@Table({tableName: 'collections', timestamps: false})
export class Collection extends Model {
	@BelongsTo(() => OriginalCollection)
	original_collection

	@ForeignKey(() => OriginalCollection)
	@Column({
		type: DataType.INTEGER
	})
	original_collection_id;

	@HasMany(() => Asset)
	assets;

	@HasMany(() => CollectionListValues, 'collection_id')
	collection_list_values;

	@HasMany(() => Event)
	events;

	@HasMany(() => Trait)
	traits;

	@HasMany(() => CollectionStat, 'collection_id')
	collection_stats;

	@HasOne(() => CollectionLists)
	collection_lists;

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

	@Column({
		type: DataType.STRING
	})
	link_opensea;

	@Column({
		type: DataType.STRING
	})
	link_website;

	@Column({
		type: DataType.STRING
	})
	link_discord;

	@Column({
		type: DataType.STRING
	})
	link_twitter;

	@Column({
		type: DataType.STRING,
		unique: true,
	})
	slug;

	@Column({
		type: DataType.FLOAT,
	})
	mint;

	@Column({
		type: DataType.INTEGER,
	})
	art_blocks;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true
	})
	show_collection;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true
	})
	parse_collection;
}
