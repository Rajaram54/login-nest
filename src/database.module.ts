import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as models from './models';

@Global()
@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is globally available
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER_NAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        models: Object.values(models),
        synchronize: configService.get<string>('NODE_ENV') !== 'production', // Disable in production
        logging: configService.get<boolean>('DB_LOGGING', false), // Optional logging flag
      }),
    }),
  ],
  exports: [SequelizeModule], // Export SequelizeModule to use it in other modules
})
export class DatabaseModule {}
