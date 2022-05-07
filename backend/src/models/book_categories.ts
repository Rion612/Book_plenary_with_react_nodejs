import { DataTypes, Model } from "sequelize";
import db from "../config/db-conn";
import books from "./books";


interface bookCategoriesAttributes {
    id?: number;
    books_id: number;
    category_id: number;
}

export default class book_categories extends Model<bookCategoriesAttributes>{

}
book_categories.init(
    {
        books_id: DataTypes.NUMBER,
        category_id: DataTypes.NUMBER,
    },
    {
        sequelize: db,
        modelName: "book_categories",
        tableName: "book_categories",
    }
)
export function associatedBookCategoriesWithBooks() {
    book_categories.belongsTo(books, { foreignKey: "books_id", as: "books" });
  }