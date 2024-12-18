import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginDto } from "./dtos/login.dto";

@Controller("login")
export class LoginController {
    
    constructor(private readonly loginService: LoginService) {}

    @Post("/")
    async login(@Body() body: LoginDto) {
        const result = await this.loginService.checkLogin(body);
        return result;
    }

    @Post("/create")
    async register(@Body() body: LoginDto) {
        const result = await this.loginService.createAccount(body);
        return result;
    }

    @Get("/profile")
    async getProfile(@Req() request) {
        const result = await this.loginService.getProfile(request.user);
        return result;
    }
    
}