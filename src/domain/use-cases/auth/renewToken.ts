import { UserRepository } from "../../repositories/user.repository";

interface RenewTokenUseCase {
  execute: (id: string) => Promise<{ token: string }>;
}

export class RenewToken implements RenewTokenUseCase {
  public constructor(private readonly userRepository: UserRepository) {}

  public execute = async (id: string): Promise<{ token: string }> => {
    const user = await this.userRepository.findById(id);

    // console.log({ user });

    return this.userRepository.renewToken(id);
  };
}
