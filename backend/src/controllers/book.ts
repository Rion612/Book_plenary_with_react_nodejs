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
                        through: { attributes: [] },
                        required: false
                    }
                ],
                limit,
                offset,
                order: [
                    [order_by, order]
                ],
                distinct: true
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
        const basePath: string = path.join(path.dirname(__dirname), '/uploads/');
        let bookImageName: string = "";
        let bookFileName: string = "";
        try {
            let rules = {
                name: "required|string",
                writer: "required|string",
                description: "required|string"
            }
            const files: any = req.files;
            if (files && !Object.keys(files).length) {
                return res.status(422).send({
                    status: false,
                    message: "Validation errors occured !",
                    error: ["Book Image is required !", "Book file is required!"]
                })
            }
            if(!files.bookImage) {
                await HelperController.fileRemoved(basePath + files.bookFile[0].filename);
                return res.status(422).send({
                    status: false,
                    message: "Validation errors occured !",
                    error: ["Book Image is required !"]
                })
            }
            if(!files.bookFile) {
                await HelperController.fileRemoved(basePath + files.bookImage[0].filename);
                return res.status(422).send({
                    status: false,
                    message: "Validation errors occured !",
                    error: ["Book file is required !"]
                })
            }
            bookImageName = files.bookImage[0].filename;
            bookFileName = files.bookFile[0].filename;
            const validation = new validator(req.body, rules);
            if (validation.fails()) {
                await HelperController.fileRemoved(basePath + bookImageName);
                await HelperController.fileRemoved(basePath + bookFileName);
                return res.status(200).send({
                    status: false,
                    message: "Validation errors occured !",
                    error: validation.errors.all()
                })
            }
            let categoriesObj: any = []
            const categories = (typeof req.body.categories === "string") ? JSON.parse(req.body.categories) : req.body.categories;
            const bk: any = await Book.findOne({
                where: { name: req.body.name }
            })
            if (bk) {
                await HelperController.fileRemoved(basePath + bookImageName);
                await HelperController.fileRemoved(basePath + bookFileName);
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
            obj.bookImage = bookImageName;
            obj.bookFile = bookFileName;
            const create: any = await Book.create(obj, { transaction })
            
            if (!create) {
                await HelperController.fileRemoved(basePath + bookImageName);
                await HelperController.fileRemoved(basePath + bookFileName);
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
                    await HelperController.fileRemoved(basePath + bookImageName);
                    await HelperController.fileRemoved(basePath + bookFileName);
                    transaction.rollback();
                    return res.status(500).send({
                        status: false,
                        message: "Something went wrong! Please try again later.",
                        error: error
                    })
                })
        } catch (error) {
            await HelperController.fileRemoved(basePath + bookImageName);
            await HelperController.fileRemoved(basePath + bookFileName);
            transaction.rollback();
            return res.status(500).send({
                status: false,
                message: "Something went wrong! Please try again later.",
                error: error
            })
        }

    }
    async updateBook(req: Request, res: Response) {
        const transaction: any = await db.transaction({ autocommit: false })
        const basePath: string = path.join(path.dirname(__dirname), '/uploads/');
        let bookImageName = "";
        let bookFileName = "";
        let files: any;
        try {
            let rules = {
                id: "required"
            }
            const validation = new validator(req.body, rules);
            if (validation.fails()) {
                if(files && Object.keys(files).length) {
                    if(files.bookImage) {
                        await HelperController.fileRemoved(basePath + bookImageName);
                    }
                    if(files.bookFile) {
                        await HelperController.fileRemoved(basePath + bookFileName);
                    }
                }
                return res.status(422).send({
                    status: false,
                    message: "Validation errors occured !",
                    error: validation.errors.all()
                })
            }
            const bookFound: any = await Book.findOne({
                where: { id: req.body.id }
            });
            if(!bookFound) {
                return res.status(400).send({
                    status: false,
                    message: "The book is not found.",
                    error: {}
                })
            }
            files = req.files;
            if(files.bookImage) {
                bookImageName = files.bookImage[0].filename;
            }
            if(files.bookFile) {
                bookFileName = files.bookFile[0].filename;
            }
            let categoriesObj: any = []
            const categories =
              typeof req.body.categories === "string"
                ? JSON.parse(req.body.categories)
                : req.body.categories;
            const obj: any = {
                name: (req.body.name).trim(),
                slug: slugify(req.body.name),
                writer: req.body.writer,
                description: req.body.description,
            }
            if(req.body.name) {
                bookFound.name = (req.body.name).trim();
            }
            if(req.body.slug) {
                bookFound.slug = slugify(req.body.name);
            }
            if(req.body.writer) {
                bookFound.writer = req.body.writer;
            }
            if(req.body.description) {
                bookFound.description = req.body.description;
            }
            if(files.bookImage) {
                bookFound.bookImage = bookImageName;
            }
            if(files.bookFile){
                bookFound.bookFile = bookFileName;
            }
            const create: any = await bookFound.save({ transaction: transaction})
            if (!create) {
                if(files && Object.keys(files).length) {
                    if(files.bookImage) {
                        await HelperController.fileRemoved(basePath + bookImageName);
                    }
                    if(files.bookFile) {
                        await HelperController.fileRemoved(basePath + bookFileName);
                    }
                }
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
                        message: "Book updated succesfully.",
                        data: {}
                    })
                })
                .catch(async (error) => {
                    if(files && Object.keys(files).length) {
                        if(files.bookImage) {
                            await HelperController.fileRemoved(basePath + bookImageName);
                        }
                        if(files.bookFile) {
                            await HelperController.fileRemoved(basePath + bookFileName);
                        }
                    }
                    transaction.rollback();
                    return res.status(500).send({
                        status: false,
                        message: "Something went wrong! Please try again later.",
                        error: error
                    })
                })
        } catch (error) {
            console.log(error)
            if(files && Object.keys(files).length) {
                if(files.bookImage) {
                    await HelperController.fileRemoved(basePath + bookImageName);
                }
                if(files.bookFile) {
                    await HelperController.fileRemoved(basePath + bookFileName);
                }
            }
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
            const bookImagePath = path.join(path.dirname(__dirname), "uploads", book.bookImage);
            const bookFilePath = path.join(path.dirname(__dirname), "uploads", book.bookFile);
            await HelperController.fileRemoved(bookImagePath);
            await HelperController.fileRemoved(bookFilePath);
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
            const id: any = req.params.id;
            const book: any = await Book.findOne({ 
                where: {id:id },
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
            const categories: any = [];
            book.categories.map((item: any)=>{
                categories.push(item.id)
            })
            const response = {
              id: book.id,
              name: book.name,
              slug: book.slug,
              writer: book.writer,
              description: book.description,
              bookImage: book.bookImage,
              bookFile: book.bookFile,
              categories: categories
            };
            return res.status(200).send({
                status: true,
                message: "Book is found.",
                data: response
            })
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Something went wrong! Please try again later.",
                error: error
            })
        }
    }
    // async getBooksByCategory(req: Request, res: Response) {
    //     try {
    //         const id = req.params.category_id;
    //         const books = await 
    //     } catch (error) {
            
    //     }
    // }

}
export default new BookController()