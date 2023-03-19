import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST , DB_PORT} = process.env;


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  username: DB_USERNAME,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT),
  host: DB_HOST,
  database: DB_NAME,
  autoLoadEntities: true,
  logging: true,
  entities: ['dist/**/*.entity{ .ts,.js}'],
  synchronize: true

  }

 

 















