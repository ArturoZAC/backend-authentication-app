import * as z from "zod";

export class RegisterUserDto {

  public constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ){}
  
  public static schema = z.object({
    name: z.string('Name is required').min(3, 'Name must be at least 3 characters'),
    email: z.string('Email is required').regex(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      'Email is not valid'
    ),
    password: z.string('Password is required').min(5, 'Password must be at least 5 characters'),
  })

  public static created = ( object: z.infer<typeof this.schema>) => {

    const result = this.schema.safeParse(object);

    if( !result.success ){
      return [result.error.issues[0]?.message, undefined] as const;
    }

    const { name, email, password } = result.data;
    return [ undefined, new RegisterUserDto( name, email, password )] as const;
  }

}