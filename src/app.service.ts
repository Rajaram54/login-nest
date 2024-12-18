import { Injectable } from "@nestjs/common";

@Injectable()
export class Appservice {
    constructor() {}

    public getInfo() {
        return { message: "Hello world!!!" };
    }
}