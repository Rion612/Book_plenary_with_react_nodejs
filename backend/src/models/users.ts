import { Model, DataTypes } from "sequelize";
import db from "../config/db-conn";

interface userAttributes{
    name: string,
    email: string,
    password: string
}
export default class User extends Model<userAttributes>{}

User.init(
    {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    },
    {
        sequelize: db,
        modelName: 'User',
        tableName: 'users'
    }
)