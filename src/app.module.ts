import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MediaModule } from './media/media.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true , envFilePath:'.env'
  }),
  
  TypeOrmModule.forRoot(typeOrmConfig), MediaModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
 
