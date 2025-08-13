import * as z from "zod";

export class LoginUserDto {

  public constructor(
    public email: string,
    public password: string,
  ){}

  public static schema = z.object({
    email: z.string('Email is required').regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      'Email is not valid'
    ),
    password: z.string('Password is required').min(5, 'Password must be at least 5 characters'),
  });

  public static login = ( object: z.infer< typeof this.schema> ) => {
    const result = this.schema.safeParse(object);

    if( !result.success ){
      return [ result.error.issues[0]?.message , undefined] as const;
    }
    
    const { email, password } = result.data;
    return [undefined, new LoginUserDto(email, password)] as const ;
  }

}