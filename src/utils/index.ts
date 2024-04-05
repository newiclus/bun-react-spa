import { ZodError } from "zod";

/*
 * Parse zod error to object and return it, is used to show error messages in the form
 * @param error: ZodError
 * @returns { [key: string]: string }
 */
export function parseZodError(err: ZodError) {
  return err.errors.reduce(
    (acc: { [key: string]: any }, error: any) => ({
      ...acc,
      [error.path[0]]: error.message,
    }),
    {}
  );
}
