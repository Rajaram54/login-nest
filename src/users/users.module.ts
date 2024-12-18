import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../models";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    imports: [SequelizeModule.forFeature([User]),],
    providers: [UserService, JwtService],
    controllers: [UserController]
})

export class UserModule {};
