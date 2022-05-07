import { Model, DataTypes } from "sequelize";
import db from "../config/db-conn";

interface userAttributes{
    name: string,
    email: string,
    password: string
}
export default class users extends Model<userAttributes>{}

users.init(
    {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    },
    {
        sequelize: db,
        modelName: 'users'
    }
)