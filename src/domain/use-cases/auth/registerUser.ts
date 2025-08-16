import { UserEntity, UserRepository } from "../..";
import { RegisterUserDto } from '../../dtos/auth/registerUser.dto';
import { CodeRepository } from "../../repositories/code.repository";
import { EmailRepository } from "../../repositories/email.repository";

export interface RegisterUserUseCase {
  execute( registerUserDto: RegisterUserDto, frontBaseUrl: string ): Promise<UserEntity>
}

export class RegisterUser implements RegisterUserUseCase {
  
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly emailRepository: EmailRepository,
    private readonly codeRepository: CodeRepository,
  ){}

  public execute = async( registerUserDto: RegisterUserDto, frontBaseUrl: string ): Promise<UserEntity> => {
    const user = await this.userRepository.register(registerUserDto);

    const code = require("crypto").randomBytes(64).toString("hex");

    await this.codeRepository.create( user.id, code );

    await this.emailRepository.sendEmail({
      to: user.email,
      subject: 'Bienvenido',
      htmlBody: `
        <div style="max-width: 500px; margin: 50px auto; background-color: #f8fafc; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: 'Arial', sans-serif; color: #333333;">
          
          <h1 style="color: #000000ff; font-size: 28px; text-align: center; margin-bottom: 20px;">¡Hola ${user.name.toUpperCase()} 😊📧!</h1>    
          
          <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px; text-align: center;">Gracias por registrarte en nuestra aplicación. Para verificar su cuenta, haga clic en el siguiente enlace:</p>
          
          <div style="text-align: center;">
              <a href="${frontBaseUrl}/verify_email/${code}" style="display: inline-block; background-color: #000000ff; color: #ffffff; text-align: center; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 18px;">¡Verificar cuenta!</a>
          </div>
        </div>
      `
    })

    return user;
  }

}