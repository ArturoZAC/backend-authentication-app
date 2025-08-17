import * as z from "zod";

export class ResetPasswordUserDto {

  public constructor(
    public newPassword: string,
  ){}

  public static schema = z.object({
    newPassword: z.string('Password is required').min(5, 'Password must be at least 5 characters'),
  });

  public static reset = ( object: z.infer< typeof this.schema> ) => {
    const result = this.schema.safeParse(object);

    if( !result.success ){
      return [ result.error.issues[0]?.message , undefined] as const;
    }
    
    return [undefined, new ResetPasswordUserDto(result.data.newPassword)] as const ;
  }

}