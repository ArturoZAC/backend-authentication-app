import { UserEntity, UserRepository } from "../..";
import { RegisterUserDto } from '../../dtos/auth/registerUser.dto';
import { EmailRepository } from "../../repositories/email.repository";

export interface RegisterUserUseCase {
  execute( registerUserDto: RegisterUserDto ): Promise<UserEntity>
}

export class RegisterUser implements RegisterUserUseCase {
  
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly emailRepository: EmailRepository,
  ){}

  public execute = async( registerUserDto: RegisterUserDto ): Promise<UserEntity> => {
    const user = await this.userRepository.register(registerUserDto);

    await this.emailRepository.sendEmail({
      to: user.email,
      subject: 'Bienvenido',
      htmlBody: `<h1>Hola ${user.name}</h1>`,
    })

    return user;
  }

}