import { Request, Response } from "express";
import categories from "../models/category";
import validator from "validatorjs";
import HelperController from "../helpers/helpers";
import users from "../models/users";
import jwt from "jsonwebtoken"
class AuthController {
    async signup(req: Request, res: Response) {
        try {
            let rules = {
                fullname: "required|string",
                email: "required",
                password: "required|confirmed"
            }
            let validation = new validator(req.body, rules);
            if (validation.fails()) {
                return res.status(200).send({
                    status: false,
                    message: "Validation errors occured!",
                    errors: validation.errors.all()
                })
            }
            const exist: any = await users.findOne({
                attributes: ['id'],
                where: { email: req.body.email }
            });
            if(exist) {
                return res.status(200).send({
                    status: false,
                    message: "Email already exists.",
                    result: {}
                })
            }
            const userObj: any = {
                name: req.body.fullname,
                email: req.body.email,
                password: await HelperController.encryptPassword(req.body.password),
            }
            const user: any = await users.create(userObj);
            if(user) {
                return res.status(200).send({
                    status: true,
                    message: "User registration successful.Please login.",
                    data: {}
                })
            }
            else {
                return res.status(500).send({
                    status: false,
                    message: "Something is wrong! Please try again later.",
                    error: {}
                })
            }  
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Something is wrong! Please try again later.",
                error: error
            })
        }
    }
    async login(req: Request, res: Response){
        try {
            let rules = {
                email: "required",
                password: "required"
            }
            let validation = new validator(req.body, rules);
            if (validation.fails()) {
                return res.status(200).send({
                    status: false,
                    message: "Validation errors occured!",
                    errors: validation.errors.all()
                })
            }
            const exist: any = await users.findOne({
                attributes:['id','email','name','is_admin','password'],
                where: { email: req.body.email }
            });
            // return res.send(exist)
            if(!exist) {
                return res.status(200).send({
                    status: false,
                    message: "User is not signed up with this email.",
                    error: {}
                })
            }
            const secretKey: any = process.env.JWT_SECRET_KEY;
            const password_matched = await HelperController.comparepassword(req.body.password, exist.password);
            if(password_matched) {
                const token: any = jwt.sign(
                    {
                        id: exist.id,
                        name: exist.name,
                        email: exist.email,
                        is_admin: exist.is_admin
                    },
                    secretKey,
                    {
                        expiresIn: '1h'
                    })
                return res.status(200).send({
                    status: true,
                    message: "Login successfull",
                    data: {
                        token,
                        user: exist
                    }
                })
            } else {
                return res.status(200).send({
                    status: false,
                    message: "Password did not matched.",
                    error: {}
                })
            }
            

            
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Something is wrong! Please try again later.",
                error: error
            })
        }
    }
    async logout(req: Request, res:Response){
        try {
            return res.status(200).send({
                status: true,
                message: "Logout successful.",
                data: {}
            })
            
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Something is wrong! Please try again later.",
                error: error
            })
        }
    }

}
export default new AuthController()