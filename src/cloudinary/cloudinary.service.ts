import { Injectable } from "@nestjs/common";
import { CloudinaryConfig } from "./cloudinary.config";
import {v2 as cloudinary} from "cloudinary";


@Injectable()
export class CloudinaryService {
    constructor(

    ) {
        CloudinaryConfig()
    }

    async uploadImage(file: Express.Multer.File): Promise<any> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                resource_type: "image"
            },
            (error, result) => {
                if(error) return reject(error)
                resolve(result)
            }
        ).end(file.buffer)
        })
    }
}
