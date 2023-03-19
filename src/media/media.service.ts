import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMediaDto} from './dto/create-media.dto';
import { UpdateUserDto } from './dto/update-media.dto';
import { InjectRepository  } from '@nestjs/typeorm';
import { Repository  } from 'typeorm';
import { Media } from './entities/media.entity';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { DataSource } from 'typeorm';


@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>, private dataSource: DataSource
  ) {}

  // Create Media
  async create(createMediaDto: CreateMediaDto) {
    return await this.mediaRepository.save(createMediaDto);
  }

  // Get All Media
  async findAll(): Promise<Media[]> {
    return await this.mediaRepository.find();
  }


async paginate(options: IPaginationOptions): Promise<Pagination<Media>>{
  const queryBuilder = this.mediaRepository.createQueryBuilder('m');
  queryBuilder.orderBy('m.id', 'DESC')
  return paginate<Media>(queryBuilder, options)
  
}



  // Get Media By Id
  async findOne(id: number): Promise<Media> {
    const findById = await this.mediaRepository.findOne({ where: { id: id } });
    if (!findById)
      throw new HttpException(
        `User with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    return findById;
  }

  // Update Media
  async update(id: number, updateMediaDto: UpdateUserDto): Promise<Media> {
    const getMedia = await this.mediaRepository.findOne({ where: { id: id } });
    if (!getMedia)
      throw new HttpException(
        `User with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );

    const updateMedia = { ...getMedia, ...updateMediaDto, updated_at: new Date() };
    return await this.mediaRepository.save(updateMedia);
  }




// Search
  async searchMedia (args : any){
    const {searchQuery} = args;
    const mediaRepository = this.dataSource.getRepository(Media)
       return mediaRepository.createQueryBuilder().select()
       .where(`MATCH(description) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
       .getMany()

  }

  // Delete Media
  async remove(id: number) {
    const findById = await this.mediaRepository.findOne({ where: { id: id } });

    if (!findById) {
      throw new HttpException(
        `Media with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const deleteMedia = await this.mediaRepository.delete(id);

    return deleteMedia;
  }
}


