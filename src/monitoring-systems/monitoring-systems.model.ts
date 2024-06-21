import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ConnectedSystems } from "src/connected-systems/connected-systems.model";

@Table({ tableName: "monitoring_systems" })
export class MonitoringSystems extends Model<MonitoringSystems> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => ConnectedSystems)
  connectedSystems: ConnectedSystems[];
}
