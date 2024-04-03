import { useParams, useNavigate } from "react-router-dom";
import { createId } from "@paralleldrive/cuid2";

import ROUTES from "@/config/routes";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { create, update } from "@/modules/user/slice/reducer";
import NavBar from "@/components/NavBar";
import { FormUser } from "@/modules/user/ui/form";

export default function UserCreate({ isEdit }: { isEdit?: boolean }) {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const user = useAppSelector((state) =>
    state.user.data.find((user) => user.id === userId)
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (formData: any) => {
    if (!isEdit) {
      formData.id = createId();
      dispatch(create(formData));
    } else {
      formData.id = userId;
      dispatch(update(formData));
    }
    navigate("/");
  };

  return (
    <>
      <NavBar currentRoute={isEdit ? ROUTES.EDIT_USER : ROUTES.CREATE_USER} />

      <h1 className="mb-6 text-2xl font-bold">
        {isEdit ? "Edit User" : "Create User"}
      </h1>

      <div className="w-full flex flex-col gap-4">
        <FormUser
          isEdit={isEdit}
          onSubmit={handleSubmit}
          defaultValues={isEdit ? user : undefined}
        />
      </div>
    </>
  );
}
