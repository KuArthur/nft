import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({tableName: 'etherium_stats', timestamps: false})
export class EtheriumStats extends Model {
    @Column({ allowNull: false, defaultValue: 0, primaryKey: true, type: DataType.INTEGER })
    id;

    @Column({ allowNull: false, defaultValue: 0, type: DataType.INTEGER })
    gasPrice;

    @Column({ allowNull: false, defaultValue: 0, type: DataType.INTEGER })
    etheriumPrice;
}
