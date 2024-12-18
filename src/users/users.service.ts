import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../models";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
    ) {}

    async getList () {
        const result = await this.userModel.findAll();
        return result;
    }

    async createUser(body) {
        const { name, email, picture } = body;

        const userResult = await this.userModel.findOne({
            where: {
                email,
            }
        });

        if(!userResult) {
            const result = await this.userModel.create({
                name, email, picture
            });
            return result;
        }
        return [];
    }

    async findOnEmail(email) {
        const result = await this.userModel.findOne({
            where: {
                email,
            },
        });
        return result;
    }
}