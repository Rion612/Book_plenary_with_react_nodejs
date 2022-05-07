import { DataTypes, Model } from "sequelize";
import db from "../config/db-conn";
import books from "./books";


interface categoryAttributes{
    id?: number;
    type: string;
}

export default class categories extends Model<categoryAttributes>{

}
categories.init(
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
    categories.belongsToMany(books, {
      through: "book_categories",
      foreignKey: "category_id",
      as: "book_categories",
    });
  }