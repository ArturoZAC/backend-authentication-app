import { BcryptAdapter, JwtAdapter } from "../../config/adapters";
import { prisma } from "../../data/postgres.data";
import { CreateUserDto, CustomError, LoginUserDto, RegisterUserDto, UpdateUserDto, UserDatasource, UserEntity } from "../../domain";

export class UserDatasourceImpl implements UserDatasource {

  public async verifyPasswordEmail(email: string): Promise<UserEntity> {
    const existUser = await prisma.user.findUnique({ where: { email }})
    if( !existUser ) throw CustomError.badRequest('Email not exist');

    return existUser;
  }
  
  public async verifyEmail(userId: string): Promise<void> {
    const userExist = await prisma.user.findUnique({ where: { id: userId}});
    if( !userExist ) throw CustomError.notFound(`User with id: ${userId} is not found`)
    
    await prisma.user.update({ where: { id: userExist.id}, data: { emailValidated: true }});
  }
  
  public async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const existUser = await prisma.user.findUnique({ where: { email: registerUserDto.email }})
    if( existUser ) throw CustomError.badRequest('Email already exist');

    const user = await prisma.user.create({ data: {
    ...registerUserDto,
    password: BcryptAdapter.hash( registerUserDto.password )
    } })

    if (!user) throw CustomError.internalServer("User could not be created");

    return UserEntity.fromObject(user);
    
  }

  public async login(loginUserDto: LoginUserDto): Promise<{ user: UserEntity, token: string}> {
    const hasAccount = await prisma.user.findUnique({ where: { email: loginUserDto.email }});
    if ( !hasAccount ) throw CustomError.notFound('User not exist');
    if ( !hasAccount.emailValidated ) throw CustomError.unAuthorized('Email not verify');

    const isMatch = BcryptAdapter.compare( loginUserDto.password, hasAccount.password);
    if ( isMatch ){

      const token = await JwtAdapter.signJWT({ id: hasAccount.id }) as string;

      return {
        user: UserEntity.fromObject( hasAccount ),
        token: token,
      } 
    }

    throw CustomError.badRequest('Password incorrect');
  }
  
  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {

    const existUser = await prisma.user.findUnique({ where: { email: createUserDto.email }})
    if( existUser ) throw CustomError.badRequest('Email already exist');

    const user = await prisma.user.create({ data: {
      ...createUserDto,
      password: BcryptAdapter.hash( createUserDto.password )
    } })
    if (!user) throw CustomError.internalServer("User could not be created");

    return UserEntity.fromObject(user);
  }

  public async getAll(): Promise<UserEntity[]> {
    const users = await prisma.user.findMany();
    if ( !users ) throw CustomError.notFound('Users do not exist');

    return users.map( user => UserEntity.fromObject(user));
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await prisma.user.findUnique({ where: { id: id }})
    if( !user ) throw CustomError.notFound(`User with id: ${id} is not found`)

    return UserEntity.fromObject(user);
  }

  public async updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findById(updateUserDto.id);

    const { id:updatedId , ...rest} = updateUserDto;

    const updatedUser = await prisma.user.update({
      where: { id: updatedId},
      data: rest
    })

    return UserEntity.fromObject(updatedUser);
  }

  public async deleteById(id: string): Promise<UserEntity> {
    await this.findById(id);

    const userDeleted = await prisma.user.delete({ where: { id }})
    // console.log({userDeleted});

    return UserEntity.fromObject(userDeleted);
  }

}