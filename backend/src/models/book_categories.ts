import { DataTypes, Model, Sequelize } from "sequelize";
import db from "../config/db-conn";
import Book from "./books";


interface bookCategoriesAttributes {
    books_id: number;
    category_id: number;
}

export default class BookCategory extends Model<bookCategoriesAttributes>{

}
BookCategory.init(
    {
        books_id: DataTypes.NUMBER,
        category_id: DataTypes.NUMBER,
    },
    {
        sequelize: db,
        modelName: "BookCategory",
        tableName: "book_categories"
    }
)