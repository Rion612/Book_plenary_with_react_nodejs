import { DataTypes, Model } from "sequelize";
import db from "../config/db-conn";
import Book from "./books";


interface categoryAttributes{
    id?: number;
    type: string;
}

export default class Category extends Model<categoryAttributes>{

}
Category.init(
    {
        type: DataTypes.STRING
    },
    {
        sequelize: db,
        modelName: "categories",
        tableName: "categories",
    }
)
export function associateWithBooks(): void {
    Category.belongsToMany(Book, {
      through: "book_categories",
      foreignKey: "category_id",
      as: "books",
    });
  }