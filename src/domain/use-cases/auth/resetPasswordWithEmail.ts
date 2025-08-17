import { ResetPasswordWithEmailUserDto } from '../../dtos';
import { CodeRepository } from '../../repositories/code.repository';
import { EmailRepository } from '../../repositories/email.repository';
import { UserRepository } from '../../repositories/user.repository';

export interface ResetPasswordWithEmailUseCase{
  execute ( resetPasswordWithEmailUserDto: ResetPasswordWithEmailUserDto, frontBaseUrl: string): Promise<any>;
}

export class ResetPasswordWithEmail implements ResetPasswordWithEmailUseCase{

  public constructor(
    private readonly userRepository: UserRepository,
    private readonly codeRepository: CodeRepository,
    private readonly emailRepository: EmailRepository,
  ){}

  public async execute( resetPasswordWithEmailUserDto: ResetPasswordWithEmailUserDto, frontBaseUrl: string ): Promise<any> {
    
    const user = await this.userRepository.verifyPasswordEmail(resetPasswordWithEmailUserDto.email);

    const code = require("crypto").randomBytes(64).toString("hex");

    await this.codeRepository.create( user.id, code );

    await this.emailRepository.sendEmail({
      to: user.email,
      subject: 'Restablece tu contraseña',
      htmlBody: `
      <div style="max-width: 500px; margin: 50px auto; background-color: #f8fafc; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: 'Arial', sans-serif; color: #333333;">
        <h1 style="color: #000000ff; font-size: 28px; text-align: center; margin-bottom: 20px;">¡Hola ${user.name.toUpperCase()} 👁️🔒!</h1>
        <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px; text-align: center;">
        Has solicitado restablecer tu contraseña. Para continuar, haz clic en el siguiente enlace:
        </p>
        <div style="text-align: center;">
        <a href="${frontBaseUrl}/reset_password/${code}" style="display: inline-block; background-color: #000000ff; color: #ffffff; text-align: center; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 18px;">
          Cambiar contraseña
        </a>
        </div>
        <p style="font-size: 14px; color: #888888; text-align: center; margin-top: 20px;">
        Si no solicitaste este cambio, puedes ignorar este correo.
        </p>
      </div>
      `
    });

    return {
      status: "Email sent successfully"
    }
  }

};