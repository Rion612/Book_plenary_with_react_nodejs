import { Request, Response } from "express";
import validator from "validatorjs";
import HelperController from "../helpers/helpers";
import users from "../models/users";
import jwt from "jsonwebtoken"
import Category, { associateWithBooks } from "../models/category";
import Book, { associateWithCategories } from "../models/books";
import book_categories from "../models/book_categories";
import db from "../config/db-conn";
import fs from 'fs'
import path from "path";
import slugify from "slugify";
import { global_variable } from "../helpers/global_variables";
associateWithBooks()
associateWithCategories();
class BookController {
    async getAllBooks(req: Request, res: Response) {
        try {
            const page: any = req.query.page ? req.query.page : global_variable.page;
            let size: any = req.query.size ? req.query.size : global_variable.size;
            size = +size;
            const limit: any = size;
            const offset: any = (page > 0) ? (page - 1) * limit : 0;
            const sorting_type = req.query?.sorting_type || "latest";
            let order: any, order_by: any;
            if(sorting_type == "z_to_a"){
                order = "DESC";
                order_by = "name"
            }
            else if(sorting_type == "oldest"){
                order = "ASC";
                order_by = "createdAt"
            }
            else if(sorting_type == "a_to_z"){
                order = "ASC";
                order_by = "name"
            }
            else{
                order = "DESC";
                order_by = "createdAt" 
            }
            const bk: any = await Book.findAndCountAll({
                // where: {id: 16},
                include: [
                    {
                        model: Category,
                        as: "categories",
                        attributes: ['id', 'type'],
                        through: { attributes: [] }
                    }
                ],
                limit,
                offset,
                order: [
                    [order_by, order]
                ]
            })
            return res.status(200).send({
                status: true,
                message: "Date found",
                total: bk.count,
                data: bk.rows
            })
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Something went wrong! Please try again later.",
                error: error
            })
        }

    }
    async createBook(req: Request, res: Response) {
        const transaction: any = await db.transaction({ autocommit: false })
        let filename: any;
        
        try {
            let rules = {
                name: "required|string",
                writer: "required|string",
                description: "required|string"
            }
            if (!req.file) {
                return res.status(200).send({
                    status: false,
                    message: "Validation errors occured !",
                    error: ["Book Image is required !"]
                })
            }
            filename = req.file.filename;
            const validation = new validator(req.body, rules);
            if (validation.fails()) {
                await HelperController.fileRemoved(path.join(path.dirname(__dirname), '/uploads/') + req.file.filename);
                return res.status(200).send({
                    status: false,
                    message: "Validation errors occured !",
                    error: validation.errors.all()
                })
            }
            let categoriesObj: any = []
            const categories = (typeof req.body.categories === "string") ? JSON.parse(req.body.categories) : req.body.categories;
            const bk: any = await Book.findOne({
                where: { slug: slugify(req.body.name) }
            })
            if (bk) {
                await HelperController.fileRemoved(path.join(path.dirname(__dirname), '/uploads/') + req.file.filename);
                return res.status(200).send({
                    status: false,
                    message: "Book already exists.",
                    data: {}
                })
            }
            const obj: any = {
                name: (req.body.name).trim(),
                slug: slugify(req.body.name),
                writer: req.body.writer,
                description: req.body.description,
            }
            obj.bookImage = req.file.filename;
            const create: any = await Book.create(obj, { transaction })
            
            if (!create) {
                await HelperController.fileRemoved(path.join(path.dirname(__dirname), '/uploads/') + req.file.filename);
                return res.status(500).send({
                    status: false,
                    message: "Something went wrong! Please try again later.",
                    error: {}
                })
            }
            categories.map((item: any)=>{
                categoriesObj.push({
                    books_id: create.id,
                    category_id: item
                })
            })
            
            await book_categories.bulkCreate(categoriesObj, { transaction })
                .then((result) => {
                    transaction.commit();
                    return res.status(200).send({
                        status: true,
                        message: "Book created succesfully.",
                        data: {}
                    })
                })
                .catch(async (error) => {
                    await HelperController.fileRemoved(path.join(path.dirname(__dirname), '/uploads/') + filename);
                    transaction.rollback();
                    return res.status(500).send({
                        status: false,
                        message: "Something went wrong! Please try again later.",
                        error: error
                    })
                })
        } catch (error) {
            await HelperController.fileRemoved(path.join(path.dirname(__dirname), '/uploads/') + filename);
            transaction.rollback();
            return res.status(500).send({
                status: false,
                message: "Something went wrong! Please try again later.",
                error: error
            })
        }

    }
    async editCategory(req: Request, res: Response) {
        try {
            let rules = {
                category_id: "required",
                type: "required"
            }
            const validation = new validator(req.body, rules);
            if (validation.fails()) {
                return res.status(200).send({
                    status: false,
                    message: "Validation errors occured !",
                    error: validation.errors.all()
                })
            }
            const cate: any = await Category.findOne({
                where: { id: req.body.category_id }
            })
            if (!cate) {
                return res.status(200).send({
                    status: false,
                    message: "Category is not found.",
                    error: {}
                })
            }
            cate.type = req.body.type;
            cate.save();
            return res.status(200).send({
                status: true,
                message: "Category updated succesfully.",
                data: {}
            })
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Something went wrong! Please try again later.",
                error: error
            })
        }

    }
    async deleteBook(req: Request, res: Response) {
        try {
            const id: any = req.params.id;
            const book: any = await Book.findByPk(id);
            if (!book) {
                return res.status(200).send({
                    status: false,
                    message: "Book is not found.",
                    error: {}
                })
            }
            await book.destroy();
            await HelperController.fileRemoved(path.join(path.dirname(__dirname), '/uploads/') + book.bookImage);
            return res.status(200).send({
                status: true,
                message: "Book is successfully deleted.",
                data: {}
            })
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Something went wrong! Please try again later.",
                error: error
            })
        }
    }
    async getBookDetails(req: Request, res: Response) {
        try {
            const book_slug: any = req.params.slug;
            const book: any = await Book.findOne({ 
                where: {slug:book_slug },
                include: [
                    {
                        model: Category,
                        as: "categories",
                        attributes: ['id', 'type'],
                        through: { attributes: [] }
                    }
                ]
            });
            if (!book) {
                return res.status(200).send({
                    status: false,
                    message: "Book is not found.",
                    error: {}
                })
            }
            return res.status(200).send({
                status: true,
                message: "Book is found.",
                data: book
            })
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Something went wrong! Please try again later.",
                error: error
            })
        }
    }

}
export default new BookController()