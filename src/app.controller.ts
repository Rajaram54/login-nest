import { Controller, Get } from "@nestjs/common";
import { Appservice } from "./app.service";

@Controller("/")
export class AppController {
    constructor( private readonly appservice: Appservice) {}

    @Get("/info")
    public GetInfo() {
        return this.appservice.getInfo();
    }
}