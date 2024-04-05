import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  lastname_father: z.string().min(2, {
    message: "Lastname must be at least 2 characters long",
  }),
  lastname_mother: z.string().min(2, {
    message: "Lastname must be at least 2 characters long",
  }),
  birthday: z.string().min(10),
  city: z.string().min(2),
  state: z.string().min(2),
  sex: z.string().min(1),
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
