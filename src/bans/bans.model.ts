import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface BanCreationAttrs {
  user_id: number;
  reason: string;
}

@Table({ tableName: "bans" })
export class Ban extends Model<Ban, BanCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, onDelete: "CASCADE" })
  user_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  reason: string;

  @BelongsTo(() => User)
  user: User;
}
