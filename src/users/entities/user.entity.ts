import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @Column('varchar')
  username: string;

  @Column('boolean', { default: false })
  present?: boolean;
}
