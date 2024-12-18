import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    schema: 'public',  // Specify the schema name here
    tableName: 'users',
    timestamps: false,
})
export class User extends Model<User> {
    @Column({
        autoIncrement: true,
        type: DataType.NUMBER,
        primaryKey: true,
        allowNull: false,
    })
    ID: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
    })
    picture: string;

    @Column({
        type: DataType.DATE,
    })
    createdOn: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedOn: Date;
}
