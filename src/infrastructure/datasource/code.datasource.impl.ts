import { prisma } from "../../data/postgres.data";
import { CustomError } from "../../domain";
import { CodeDatasource } from "../../domain/datasources/code.datasource";

export class CodeDatasourceImpl implements CodeDatasource {
  // public async userHasCode(userId: string): Promise<any> {
  //   const code = await prisma.codeVerification.findUnique({
  //     where: { userId },
  //   });

  //   if (!code) throw CustomError.notFound("User dont have code");

  //   return code;
  // }
  public async deleteCode(code: string): Promise<void> {
    await prisma.codeVerification.delete({ where: { code } });
    return;
  }
  public async create(userId: string, code: string): Promise<any> {
    const codeData = await prisma.codeVerification.findUnique({
      where: { userId },
    });

    if (codeData) {
      return await prisma.codeVerification.update({
        data: { code },
        where: { userId },
      });
    }

    return await prisma.codeVerification.create({ data: { userId, code } });
  }
  public async findByCode(code: string): Promise<string> {
    const userCode = await prisma.codeVerification.findUnique({
      where: { code },
    });
    if (!userCode) throw CustomError.notFound("Code not found");

    return userCode.userId;
  }
}
