import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [],
    providers: [LoginService, JwtService],
    controllers: [LoginController]
})

export class LoginModule {};
