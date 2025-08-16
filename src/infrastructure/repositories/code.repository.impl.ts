import { CodeDatasource } from "../../domain/datasources/code.datasource";
import { CodeRepository } from "../../domain/repositories/code.repository";

export class CodeRepositoryImpl implements CodeRepository {

  public constructor(
    private readonly codeDatasource: CodeDatasource
  ){}

  public create(userId: string, code: string): Promise<any> {
    return this.codeDatasource.create( userId, code);
  }
  public findByCode(code: string): Promise<any> {
    return this.codeDatasource.findByCode(code);
  }

}