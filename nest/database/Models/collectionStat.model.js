import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import * as sequelize from 'sequelize';
import { Collection } from './collection.model';

@Table({tableName: 'collection_stats'})
export class CollectionStat extends Model {
	@ForeignKey(() => Collection)
	@Column({
		type: DataType.INTEGER

	})
	collection_id;

	@BelongsTo(() => Collection)
	collection;

	@Column({
		type: DataType.FLOAT
	})
	one_day_volume;

	@Column({
		type: DataType.FLOAT
	})
	one_day_change;

	@Column({
		type: DataType.INTEGER
	})
	one_day_sales;

	@Column({
		type: DataType.FLOAT
	})
	one_day_average_price;

	@Column({
		type: DataType.FLOAT
	})
	seven_day_volume;

	@Column({
		type: DataType.FLOAT
	})
	seven_day_change;

	@Column({
		type: DataType.INTEGER
	})
	seven_day_sales;

	@Column({
		type: DataType.FLOAT
	})
	seven_day_average_price;

	@Column({
		type: DataType.FLOAT
	})
	thirty_day_volume;

	@Column({
		type: DataType.FLOAT
	})
	thirty_day_change;

	@Column({
		type: DataType.INTEGER
	})
	thirty_day_sales;

	@Column({
		type: DataType.FLOAT
	})
	thirty_day_average_price;

	@Column({
		type: DataType.FLOAT
	})
	total_volume;

	@Column({
		type: DataType.INTEGER
	})
	total_sales;

	@Column({
		type: DataType.INTEGER
	})
	total_supply;

	@Column({
		type: DataType.INTEGER
	})
	count;

	@Column({
		type: DataType.INTEGER
	})
	num_owners;

	@Column({
		type: DataType.FLOAT
	})
	average_price;

	@Column({
		type: DataType.INTEGER
	})
	num_reports;

	@Column({
		type: DataType.FLOAT
	})
	market_cap;

	@Column({
		type: DataType.FLOAT
	})
	floor_price;

	@Column({
		type: DataType.DATE
	})
	createdAt;

	@Column({
		type: DataType.DATE
	})
	updatedAt;

	// @Column({
	// 	get() {
	// 		sequelize.query('SELECT max("createdAt") AS last, collection_id FROM collection_stats GROUP BY collection_id ORDER BY last LIMIT 1;')
	// 	}
	// })
	// lastStat
}
