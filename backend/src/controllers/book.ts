import { Request, Response } from "express";
import validator from "validatorjs";
import HelperController from "../helpers/helpers";
import users from "../models/users";
import jwt from "jsonwebtoken"
import categories,{associateWithBooks} from "../models/category";
import books, { associateWithCategories } from "../models/books";
import book_categories from "../models/book_categories";
import db from "../config/db-conn";


class CategoryController{
    async getAllBooks(req: Request, res: Response){
        try {
            const bk: any = await books.findOne({
                where: {id: 5},
                include:[
                    {
                        model: categories,
                        as: "book_categories",
                        attributes: ['id','type'],
                        through: { attributes: [] },
                        required: true
                    }
                ]
            })
            return res.status(200).send({
                status: true,
                message:"Date found",
                data: bk
            })
        } catch (error) {
            return res.status(500).send({
                status: false,
                message:"Something went wrong! Please try again later.",
                error: error
            })
        }
        
    }
    async createBook(req: Request, res: Response){
        const transaction: any = await db.transaction({ autocommit: false})
        try {
            let rules = {
                name: "required|string",
                writer: "required|string",
                description: "required|string",
                bookImage: "required|string"
            }
            const validation = new validator(req.body, rules);
            if(validation.fails()){
                return res.status(200).send({
                    status: false,
                    message:"Validation errors occured !",
                    error: validation.errors.all()
                })
            }
            const bk: any = await books.findOne({
                where: { name: req.body.name }
            })
            if(bk) {
                return res.status(200).send({
                    status: false,
                    message:"Book already exists.",
                    data: {}
                })
            }
            const obj:any = {
                name: req.body.name,
                writer: req.body.writer,
                description: req.body.description,
                bookImage: req.body.bookImage,
            }
            const create: any = await books.create(obj,{ transaction })
            if(!create){
                return res.status(500).send({
                    status: false,
                    message:"Something went wrong! Please try again later.",
                    error: {}
                })
            }
            await book_categories.create({books_id: create.id,category_id: 1 }, {transaction})
            .then((result)=>{
                transaction.commit();
                return res.status(200).send({
                    status: true,
                    message:"Book created succesfully.",
                    data: {}
                })
            })
            .catch((error)=>{
                transaction.rollback();
                return res.status(500).send({
                    status: false,
                    message:"Something went wrong! Please try again later.",
                    error: error
                }) 
            })
            
        } catch (error) {
            transaction.rollback();
            return res.status(500).send({
                status: false,
                message:"Something went wrong! Please try again later.",
                error: error
            })
        }
        
    }
    // async editCategory(req: Request, res: Response){
    //     try {
    //         let rules = {
    //             category_id: "required",
    //             type: "required"
    //         }
    //         const validation = new validator(req.body, rules);
    //         if(validation.fails()){
    //             return res.status(200).send({
    //                 status: false,
    //                 message:"Validation errors occured !",
    //                 error: validation.errors.all()
    //             })
    //         }
    //         const cate: any = await categories.findOne({
    //             where: { id: req.body.category_id }
    //         })
    //         if(!cate) {
    //             return res.status(200).send({
    //                 status: false,
    //                 message:"Category is not found.",
    //                 error: {}
    //             })
    //         }
    //         cate.type =  req.body.type;
    //         cate.save();
    //         return res.status(200).send({
    //             status: true,
    //             message:"Category updated succesfully.",
    //             data: {}
    //         })
    //     } catch (error) {
    //         return res.status(500).send({
    //             status: false,
    //             message:"Something went wrong! Please try again later.",
    //             error: error
    //         })
    //     }
        
    // }
    // async deleteCategory(req: Request, res: Response){
    //     try {
    //         const id: any = req.params.id;
    //         const cat: any = await categories.findByPk(id);
    //         if(!cat) {
    //             return res.status(200).send({
    //                 status: false,
    //                 message:"Category is not found.",
    //                 error: {}
    //             })
    //         }
    //         await cat.destroy();
    //         return res.status(200).send({
    //             status: true,
    //             message:"Category is successfully deleted.",
    //             data: {}
    //         })
    //     } catch (error) {
    //         return res.status(500).send({
    //             status: false,
    //             message:"Something went wrong! Please try again later.",
    //             error: error
    //         })
    //     }
    // }

}
export default new CategoryController()