import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Ban } from "src/bans/bans.model";
import { ConnectedSystems } from "src/connected-systems/connected-systems.model";
import { MonitoringSystems } from "src/monitoring-systems/monitoring-systems.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/user-roles/user-roles.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "user@mail.ru", description: "Email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Ban)
  bans: Ban[];

  @HasMany(() => ConnectedSystems)
  connectedSystems: ConnectedSystems[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
