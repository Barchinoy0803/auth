import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async findOne(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async register(email: string, password: string, username: string): Promise<User> {
        const hashPassword = await bcrypt.hash(password, 10)
        const user = this.userRepository.create({ email, password: hashPassword, username })
        return this.userRepository.save(user)
    }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.findOne(email)
        if(!user){
            throw new UnauthorizedException("Not found this user!")
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if(!isCorrectPassword){
            throw new UnauthorizedException("Password or email invalid-wrong!!!")
        }
        const payload = {email: user.email, sub: user.id}
        return {access_token: this.jwtService.sign(payload)}
    }
}