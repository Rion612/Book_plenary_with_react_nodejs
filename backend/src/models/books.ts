import { DataTypes, Model } from "sequelize";
import db from "../config/db-conn";
import categories from "./category";


interface bookAttributes {
    id?: number;
    name: string;
    writer: string;
    description: string;
    bookImage: string;
}

export default class books extends Model<bookAttributes>{

}
books.init(
    {
        name: DataTypes.STRING,
        writer: DataTypes.STRING,
        description: DataTypes.STRING,
        bookImage: DataTypes.STRING
    },
    {
        sequelize: db,
        modelName: "books",
        tableName: "books",
    }
)
export function associateWithCategories(): void {
    books.belongsToMany(categories, {
      through: "book_categories",
      foreignKey: "books_id",
      as: "book_categories",
    });
  }