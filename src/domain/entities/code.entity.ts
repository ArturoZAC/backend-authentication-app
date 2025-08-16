import { CodeProperties } from "./interfaces/code.interface";

export class CodeVerificationEntity {

  public readonly id: string;
  public code: string;
  public userId: string;

  constructor({id, code, userId}: CodeProperties){
    this.id = id;
    this.code = code;
    this.userId = userId;
  }

  public static fromObject(props: CodeProperties): CodeVerificationEntity {
    return new CodeVerificationEntity(props);
  }

}