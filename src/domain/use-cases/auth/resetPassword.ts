import { ResetPasswordUserDto } from "../../dtos";
import { CodeRepository } from "../../repositories/code.repository";
import { UserRepository } from "../../repositories/user.repository";

export interface ResetPasswordUseCase {
  execute(
    code: string,
    resetPasswordUserDto: ResetPasswordUserDto
  ): Promise<any>;
}

export class ResetPassword implements ResetPasswordUseCase {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly codeRepository: CodeRepository
  ) {}

  public async execute(
    code: string,
    resetPasswordUserDto: ResetPasswordUserDto
  ): Promise<any> {
    const userId = await this.codeRepository.findByCode(code);
    // console.log({ code, userId });

    await this.userRepository.resetPassword(userId, resetPasswordUserDto);
    await this.codeRepository.deleteCode(code);

    return {
      status: "New Updated Password",
    };
  }
}
