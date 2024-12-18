import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./users.service";

@Controller("users")
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    @Get("/list")
    async getList() {
        try {
            const users = await this.userService.getList(); // Call the service to get all users
            return users;
          } catch (error) {
            return { message: 'Error fetching users', error: error.message }; // Handle errors
          }
    }

    @Post("/create")
    async createUser(@Body() body) {
        try {
            const users = await this.userService.createUser(body);
            return users;
          } catch (error) {
            return { message: 'Error fetching users', error: error.message };
          }
    }
}