export abstract class CodeDatasource {
  abstract create(userId: string, code: string): Promise<any>;
  abstract findByCode(code: string): Promise<string>;
  abstract deleteCode(code: string): Promise<void>;
  // abstract userHasCode(userId: string): Promise<any>;
}
