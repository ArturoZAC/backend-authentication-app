import { CodeRepository } from "../../repositories/code.repository";
import { UserRepository } from "../../repositories/user.repository";

export interface VerifyEmailUseCase {
  execute(code: string): Promise<any>;
}

export class VerifyEmail implements VerifyEmailUseCase {
  public constructor(
    private readonly codeRepository: CodeRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async execute(code: string): Promise<any> {
    const userId = await this.codeRepository.findByCode(code);
    await this.userRepository.changeVerify(userId);
    await this.codeRepository.deleteCode(code);

    return {
      status: "Verified Email",
      ok: true,
    };
  }
}
