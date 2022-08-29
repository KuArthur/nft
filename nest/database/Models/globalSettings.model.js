import { Column, Table, DataType, Model } from 'sequelize-typescript';

@Table({ tableName: 'global_settings' })
export class GlobalSettings extends Model {
  @Column({
    type: DataType.STRING
  })
  sysName;

  @Column({
    type: DataType.BOOLEAN
  })
  value_bool;

  @Column({
    type: DataType.INTEGER
  })
  value_int;

  @Column({
    type: DataType.FLOAT
  })
  value_float;

  @Column({
    type: DataType.DATE
  })
  value_date;

  @Column({
    type: DataType.STRING
  })
  value_string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  type;

  @Column({
    type: DataType.DATE
  })
  createdAt;

  @Column({
    type: DataType.DATE
  })
  updatedAt;
}
