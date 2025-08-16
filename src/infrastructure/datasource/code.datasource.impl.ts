import { prisma } from "../../data/postgres.data";
import { CustomError } from "../../domain";
import { CodeDatasource } from "../../domain/datasources/code.datasource";

export class CodeDatasourceImpl implements CodeDatasource {

  public async create(userId: string, code: string): Promise<any> {
    return await prisma.codeVerification.create({ data: { userId, code }});
  }
  public async findByCode(code: string): Promise<string> {
    const userCode = await prisma.codeVerification.findUnique({ where: { code }});
    if( !userCode ) throw CustomError.notFound('Code not found');

    return userCode.userId;
  }

}