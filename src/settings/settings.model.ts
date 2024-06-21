import { Column, DataType, Model, Table } from "sequelize-typescript";

interface SettingsCreationAttrs {}

@Table({ tableName: "settings" })
export class Settings extends Model<Settings, SettingsCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  connectedSystemId: number;
}
