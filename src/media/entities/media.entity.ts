import { BaseEntity ,Entity , PrimaryGeneratedColumn, Column, Index} from 'typeorm'

@Entity('media')
export class Media  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    name:  string;

    @Column()
    @Index({fulltext: true})
    description: string

    @Column()
    url: string

    @Column({default: true})
    status:boolean 
    
    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @Column()
    deletedAt: Date

    


    @Column({default : true})
    isActive: boolean


}
