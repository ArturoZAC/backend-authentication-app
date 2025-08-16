import { prisma } from "../../data/postgres.data";
import { CodeDatasource } from "../../domain/datasources/code.datasource";

export class CodeDatasourceImpl implements CodeDatasource {

  public async create(userId: string, code: string): Promise<any> {
    return await prisma.codeVerification.create({ data: { userId, code }});
  }
  public async findByCode(code: string): Promise<any> {
    return await prisma.codeVerification.findUnique({ where: { code }});
  }

}