import * as z from "zod";

export class ResetPasswordWithEmailUserDto {
  public constructor(public email: string) {}

  public static schema = z.object({
    email: z
      .string("Email is required")
      .regex(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Email is not valid"
      ),
  });

  public static reset = (object: z.infer<typeof this.schema>) => {
    const result = this.schema.safeParse(object);

    if (!result.success) {
      return [result.error.issues[0]?.message, undefined] as const;
    }

    return [
      undefined,
      new ResetPasswordWithEmailUserDto(result.data.email),
    ] as const;
  };
}
