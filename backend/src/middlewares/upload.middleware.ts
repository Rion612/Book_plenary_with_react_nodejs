import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        const uploadDirectory: string = path.join(path.dirname(__dirname),
            "uploads"
        );
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const prefix = Date.now();
        cb(null, prefix + path.extname(file.originalname));
    }
});

function checkFileType(file: any, cb: any) {
    const fileTypes = /jpg|jpeg|png|pdf/;
    const mimeTypes =
        /image\/jpg|image\/jpeg|image\/png||application\/pdf/;
    const extensionName = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimeType = mimeTypes.test(file.mimetype);

    if (extensionName && mimeType) {
        return cb(null, true);
    } else {
        return cb(file.fieldname, false);
    }
}

function makeMulterUploadMiddleware(multerUploadFunction: any) {
    return (req: Request, res: Response, next: NextFunction) =>
        multerUploadFunction(req, res, (err: any) => {
            // handle Multer error
            if (
                err &&
                err.field &&
                err.code === "LIMIT_FILE_SIZE" &&
                err.name === "MulterError"
            ) {
                return res.status(400).send({
                    status: false,
                    message: err.message,
                    error: err
                });
            }
            if (
                err &&
                err.field &&
                err.code === "LIMIT_UNEXPECTED_FILE" &&
                err.name === "MulterError"
            ) {
                return res.status(400).send({
                    status: false,
                    message: err.message,
                    error: err
                });
            }
            // handle other errors
            if (err && err.code === "ENOENT") {
                return res.status(400).send({
                  status: false,
                  message: err.message,
                  error: err,
                });
            }
            if (
                err === "bookImage" ||
                err === "bookFile"
            ) {
                return res.status(400).send({
                    status: false,
                    message: err.message,
                    error: err
                });
            }
            next();
        });
}

const upload = multer({
    storage,
    limits: { fileSize: 50000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

const multerUploadMiddleware: any = makeMulterUploadMiddleware(
    upload.fields([
        {
            name: "bookImage",
            maxCount: 1
        },
        {
            name: "bookFile",
            maxCount: 1
        }
    ])
);

export default multerUploadMiddleware;