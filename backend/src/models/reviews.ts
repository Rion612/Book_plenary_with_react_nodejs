import { DataTypes, Model } from "sequelize";
import db from "../config/db-conn";
import User from "./users";


interface reviewAttributes{
    id?: number;
    book_id: number;
    review: string;
    rating: number;
    user_id: number;
}

export default class Review extends Model<reviewAttributes>{

}
Review.init(
    {
        book_id: DataTypes.NUMBER,
        review: DataTypes.STRING,
        rating: DataTypes.NUMBER,
        user_id: DataTypes.NUMBER
    },
    {
        sequelize: db,
        modelName: "Review",
        tableName: "reviews",
    }
)
export function associateWithUsers(): void {
    Review.belongsTo(User, {
      foreignKey: "user_id",
      as: "users",
    });
  }

