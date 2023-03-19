import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateMediaDto {
 
  id: number;

  type: string;

  name: string;

  description: string;

  url: string;
  

}
