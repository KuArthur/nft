import {Column, Model, Table, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {Asset} from "./asset.model";
import { Collection } from './collection.model';
import {OriginalCollection} from "./originalCollection.model";
import {CollectionListValues} from "./collectionListValues.model";

@Table({
	tableName: 'events'
})
export class Event extends Model {
	@BelongsTo(() => Collection)
	collection;

	@ForeignKey(() => Collection)
	@Column({ allowNull: false, type: DataType.INTEGER })
	collection_id;

	@ForeignKey(() => OriginalCollection)
	@Column({
		type: DataType.INTEGER
	})
	original_collection_id;

	@BelongsTo(() => OriginalCollection)
	original_collection;

	@ForeignKey(() => Asset)
	@Column({ type: DataType.INTEGER })
	asset_id

	@BelongsTo(() => Asset)
	asset;

	@Column({ allowNull: false, type: DataType.INTEGER })
	inner_id;

	@Column({ allowNull: false, type: DataType.SMALLINT })
	type;

	@Column({ type: DataType.BIGINT })
	total_price;

	@Column({ type: DataType.FLOAT })
	ether_price;

	@Column({ type: DataType.FLOAT })
	ending_price;

	@Column({
		type: DataType.STRING
	})
	winner_account;

	@Column({ type: DataType.DATE })
	transaction_time;

	@Column({ type: DataType.FLOAT })
	floor;

	@Column({ type: DataType.INTEGER })
	list;

	@Column({ type: DataType.FLOAT })
	price;

	@Column({ type: DataType.FLOAT })
	volume;
}
