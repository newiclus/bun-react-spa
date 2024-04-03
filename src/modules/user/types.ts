import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastname_father: z.string(),
  lastname_mother: z.string(),
  birthday: z.string().datetime(),
  city: z.string(),
  state: z.string(),
  sex: z.string(),
});

export type User = z.infer<typeof userSchema>;

export interface UserState {
  data: User[];
}

export type UserFormProps = {
  onSubmit: (data: User) => void;
  isEdit?: boolean;
  defaultValues?: User;
};
