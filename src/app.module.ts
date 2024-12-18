import { Module, MiddlewareConsumer, NestModule, RequestMethod } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from "./authentication/auth.middleware";
import { jwtConstant } from "./constants/auth.constant";
import { AppController } from "./app.controller";
import { Appservice } from "./app.service";
import { LoginModule } from "./login/login.module";
import { UserModule } from "./users/users.module";
import { DatabaseModule } from "./database.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Makes the configuration accessible globally
            envFilePath: '.env', // Specify the .env file path
          }),
        JwtModule.register({
            secret: jwtConstant.secret,
            signOptions: { expiresIn: '10m' },
        }),
        DatabaseModule,
        LoginModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [Appservice],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
        // .exclude(
        //     { path: "/login", method: RequestMethod.POST },
        // )
        .forRoutes('*')
    }
}