import { Request, Response } from "express";
import validator from "validatorjs";
import HelperController from "../helpers/helpers";
import users from "../models/users";
import jwt from "jsonwebtoken"
import categories from "../models/category";


class CategoryController{
    async getAllCategories(req: Request, res: Response){
        try {
            const cate: any = await categories.findAll({})
            return res.status(200).send({
                status: true,
                message:"Date found",
                data: cate
            })
        } catch (error) {
            return res.status(500).send({
                status: false,
                message:"Something went wrong! Please try again later.",
                error: {}
            })
        }
        
    }
    async createCategory(req: Request, res: Response){
        try {
            let rules = {
                type: "required"
            }
            const validation = new validator(req.body, rules);
            if(validation.fails()){
                return res.status(200).send({
                    status: false,
                    message:"Validation errors occured !",
                    error: validation.errors.all()
                })
            }
            const cate: any = await categories.findOne({
                where: { type: req.body.type }
            })
            if(cate) {
                return res.status(200).send({
                    status: false,
                    message:"Category already exists.",
                    data: {}
                })
            }
            const create: any = await categories.create({ type: req.body.type })
            if(!create){
                return res.status(500).send({
                    status: false,
                    message:"Something went wrong! Please try again later.",
                    error: {}
                })
            }
            return res.status(200).send({
                status: true,
                message:"Category created succesfully.",
                data: {}
            })
        } catch (error) {
            return res.status(500).send({
                status: false,
                message:"Something went wrong! Please try again later.",
                error: error
            })
        }
        
    }
    async editCategory(req: Request, res: Response){
        try {
            let rules = {
                category_id: "required",
                type: "required"
            }
            const validation = new validator(req.body, rules);
            if(validation.fails()){
                return res.status(200).send({
                    status: false,
                    message:"Validation errors occured !",
                    error: validation.errors.all()
                })
            }
            const cate: any = await categories.findOne({
                where: { id: req.body.category_id }
            })
            if(!cate) {
                return res.status(200).send({
                    status: false,
                    message:"Category is not found.",
                    error: {}
                })
            }
            cate.type =  req.body.type;
            cate.save();
            return res.status(200).send({
                status: true,
                message:"Category updated succesfully.",
                data: {}
            })
        } catch (error) {
            return res.status(500).send({
                status: false,
                message:"Something went wrong! Please try again later.",
                error: error
            })
        }
        
    }
    async deleteCategory(req: Request, res: Response){
        try {
            const id: any = req.params.id;
            const cat: any = await categories.findByPk(id);
            if(!cat) {
                return res.status(200).send({
                    status: false,
                    message:"Category is not found.",
                    error: {}
                })
            }
            await cat.destroy();
            return res.status(200).send({
                status: true,
                message:"Category is successfully deleted.",
                data: {}
            })
        } catch (error) {
            return res.status(500).send({
                status: false,
                message:"Something went wrong! Please try again later.",
                error: error
            })
        }
    }

}
export default new CategoryController()