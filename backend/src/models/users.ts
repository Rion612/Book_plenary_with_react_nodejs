import { Model, DataTypes } from "sequelize";
import db from "../config/db-conn";

interface userAttributes{
    id?: number;
    name: string,
    email: string,
    password: string,
    is_admin?: boolean
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