import { DataTypes, Model } from "sequelize";
import db from "../config/db-conn";
import Category from "./category";


interface bookAttributes {
    id?: number;
    name: string;
    slug: string;
    writer: string;
    description: string;
    bookImage: string;
    bookFile: string;
}

export default class Book extends Model<bookAttributes>{}
Book.init(
    {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        writer: DataTypes.STRING,
        description: DataTypes.STRING,
        bookImage: DataTypes.STRING,
        bookFile: DataTypes.STRING
    },
    {
        sequelize: db,
        modelName: "Book",
        tableName: "books",
    }
)
export function associateWithCategories(): void {
    Book.belongsToMany(Category, {
      through: "book_categories",
      foreignKey: "books_id",
      as: "categories",
    });
  }