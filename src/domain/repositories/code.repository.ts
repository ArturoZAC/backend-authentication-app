export abstract class CodeRepository {

  abstract create (userId: string, code: string): Promise<any>;
  abstract findByCode ( code: string ): Promise<string>;
  abstract deleteCode ( code: string ): Promise<void>;
  
}