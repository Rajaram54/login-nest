import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstant } from "../constants/auth.constant";
import { v4 as uuidv4 } from 'uuid';

const dbStaticValues = [{
    userId: "2",
    userName: "raja",
    password: "pass"
},{
    userId: "1",
    userName: "ram",
    password: "word"
}]

@Injectable()
export class LoginService {
    constructor(private jwtService: JwtService) {}

    async checkLogin(body){
        const userDetails = dbStaticValues.find((row) => row.userName === body.userName && row.password === body.password);
        if (!userDetails) {
            throw new UnauthorizedException();
        }

        const payload = { sub: userDetails.userId, username: userDetails.userName };
        const token = await this.jwtService.signAsync(payload, { secret: jwtConstant.secret });

        return {
          access_token: token,
        };
    }

    async getProfile(user) {
        return user;
    }

    async createAccount(body) {
        if(dbStaticValues.find((row) => row.userName === body.userName)) {
            throw new HttpException('User already exist!!!', HttpStatus.BAD_REQUEST)
        }
        dbStaticValues.push({
          userName: body.userName,
          password: body.password,
          userId: uuidv4(),
        });

        return { message: "successfully created" };
    }

}