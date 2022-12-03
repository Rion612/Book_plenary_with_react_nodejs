import { DataTypes, Model } from "sequelize";
import db from "../config/db-conn";


interface reviewAttributes{
    id?: number;
    book_id: number;
    review: string;
    rating: number;
}

export default class Review extends Model<reviewAttributes>{

}
Review.init(
    {
        book_id: DataTypes.NUMBER,
        review: DataTypes.STRING,
        rating: DataTypes.NUMBER
    },
    {
        sequelize: db,
        modelName: "Review",
        tableName: "reviews",
    }
)