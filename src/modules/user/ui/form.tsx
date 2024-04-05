import { useState } from "react";
import { Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";

import { cities, states } from "@/data/db";
import { UserFormProps, User, userSchema } from "@/modules/user/types";
import { parseZodError } from "@/utils";

const userInputFields = [
  {
    type: "text",
    name: "name",
    label: "Name",
    placeholder: "Enter your name",
  },
  {
    type: "text",
    name: "lastname_father",
    label: "Father's Last Name",
    placeholder: "Enter your father's last name",
  },
  {
    type: "text",
    name: "lastname_mother",
    label: "Mother's Last Name",
    placeholder: "Enter your mother's last name",
  },
  {
    type: "date",
    name: "birthday",
    label: "Date of Birth",
    placeholder: "Enter your date of birth",
  },
];

const initialState = {
  id: "",
  name: "",
  lastname_father: "",
  lastname_mother: "",
  birthday: "",
  city: "",
  state: "",
  sex: "",
};

export function FormUser({ onSubmit, isEdit, defaultValues }: UserFormProps) {
  const [formData, setFormData] = useState<User>(defaultValues || initialState);
  const [errors, setErrors] = useState<{ [key: string | keyof User]: any }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = userSchema.safeParse(formData);

    if (!validation.success) {
      setErrors(parseZodError(validation.error));
      return;
    }

    onSubmit(formData);
  };

  return (
    <form id="user-form" onSubmit={handleSubmit}>
      {userInputFields.map(({ type, name, label, placeholder }) => (
        <div key={name} className="flex mb-6">
          <Input
            type={type}
            label={label}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            isInvalid={!!errors[name]}
            errorMessage={errors[name]}
            value={formData[name as keyof User]}
          />
        </div>
      ))}

      <div className="flex  mb-6">
        <Select
          label="Select your state of birth"
          className="max-w-xs"
          name="state"
          onChange={handleChange}
          defaultSelectedKeys={[formData.state]}
          isInvalid={!!errors.state}
          errorMessage={errors.state}
        >
          {states.map((state) => (
            <SelectItem key={state.value} value={state.value}>
              {state.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex mb-6">
        <Select
          label="Select your city of birth"
          className="max-w-xs"
          name="city"
          onChange={handleChange}
          defaultSelectedKeys={[formData.city]}
          isInvalid={!!errors.city}
          errorMessage={errors.city}
        >
          {cities.map((city) => (
            <SelectItem key={city.value} value={city.value}>
              {city.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex mb-6">
        <RadioGroup
          label="Choose your sex"
          name="sex"
          onValueChange={(value) => setFormData({ ...formData, sex: value })}
          value={formData.sex}
          defaultValue={formData.sex}
          isInvalid={!!errors.sex}
          errorMessage={errors.sex}
        >
          <Radio value="M">Male</Radio>
          <Radio value="F">Female</Radio>
        </RadioGroup>
      </div>

      <div className="flex mb-6">
        {isEdit ? (
          <Button type="submit" color="secondary">
            Edit user
          </Button>
        ) : (
          <Button type="submit" color="primary">
            Create user
          </Button>
        )}
      </div>
    </form>
  );
}
