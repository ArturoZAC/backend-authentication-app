export abstract class CodeDatasource {

  abstract create (userId: string, code: string): Promise<any>;
  abstract findByCode ( code: string ): Promise<any>;

}