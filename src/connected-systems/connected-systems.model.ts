import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { MonitoringSystems } from 'src/monitoring-systems/monitoring-systems.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'connected_systems', indexes: [{ unique: true, fields: ['userId', 'systemId'] }] })
export class ConnectedSystems extends Model<ConnectedSystems> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  login: string;

  @Column({ type: DataType.STRING, allowNull: true })
  password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  lang: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  token: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => MonitoringSystems)
  @Column({ type: DataType.INTEGER })
  systemId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => MonitoringSystems)
  monitoringSystem: MonitoringSystems;
}
