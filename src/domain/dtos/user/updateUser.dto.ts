import * as z from "zod";

export class UpdateUserDto {

  public constructor(
    public readonly id: string,
    public readonly password: string,
  ){}

  public static schema = z.object({
    id: z.string('Miss id'),
    password: z.string('Password is required').min(5, 'Password must be at least 5 characters')
  })

  public static updated = ( object: z.infer< typeof this.schema> ) => {

    const result = this.schema.safeParse(object);
    // console.log({result});
    // console.log({object});

    if( !result.success ){
      return [ result.error.issues[0]?.message, undefined ] as const;
    }

    const { id, password } = result.data;

    return [ undefined, new UpdateUserDto( id, password )] as const;

  }

}