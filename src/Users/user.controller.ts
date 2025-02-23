import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Post('register')
    async createUser(
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('username') username: string,
    ): Promise<User> {
        return this.userService.register(email, password, username)
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<{ access_token: string }> {
        return this.userService.login(email, password)
    }

    @Get('getByEmail/:email')
    async getUserByEmail(
        @Param('email') email: string
    ): Promise<User | null> {
        return this.userService.findOne(email)
    }

    @Post('upload-image')
    @UseInterceptors(FileInterceptor("file"))
    async uploadImage(
        @UploadedFile() file: Express.Multer.File
    ) {
        const imageURL = await this.cloudinaryService.uploadImage(file)
        return { url: imageURL.secure_url }
    }
}
