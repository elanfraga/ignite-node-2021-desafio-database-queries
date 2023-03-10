import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  // findAllUsersOrderedByFirstName(): Promise<User[]> {
  //   throw new Error('Method not implemented.');
  // }
  // findUserByFullName(data: IFindUserByFullNameDTO): Promise<User[] | undefined> {
  //   throw new Error('Method not implemented.');
  // }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOneOrFail({
      relations: ['games'],
      where: {
        id: user_id
      }
    });

    return user;
  }


  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('select * from users order by first_name asc'); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query('select * from users where upper(first_name) = upper($1) and upper(last_name) = upper($2)', 
    [first_name, last_name]); // Complete usando raw query
  }
}

  

