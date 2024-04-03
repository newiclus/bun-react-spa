import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import ROUTES from "@/config/routes";
import { remove } from "@/modules/user/slice/reducer";
import { useAppSelector, useAppDispatch } from "@/hooks";
import NavBar from "@/components/NavBar";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "lastname_father",
    label: "Surname",
  },
  {
    key: "lastname_mother",
    label: "Last name",
  },
  {
    key: "birthday",
    label: "Date of birth",
  },
  {
    key: "city",
    label: "City of birth",
  },
  {
    key: "state",
    label: "State of birth",
  },
  {
    key: "sex",
    label: "Sex",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

export default function UserList() {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const users = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const handleRemoveUser = () => {
    dispatch(remove(selectedUser));
    // Close modal
    onClose();
  };

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id;
    setSelectedUser(id as string);
    // Open modal
    onOpen();
  };

  return (
    <>
      <NavBar currentRoute={ROUTES.HOME} />

      <h1 className="mb-3 text-2xl font-bold">User List</h1>

      <aside className="flex mb-3 justify-end">
        <Link to={ROUTES.CREATE_USER}>
          <Button color="primary">+ New user</Button>
        </Link>
      </aside>

      <Table aria-label="Example static collection table">
        <TableHeader>
          {columns.map(({ key, label }) => (
            <TableColumn key={key}>{label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.lastname_father}</TableCell>
              <TableCell>{user.lastname_mother}</TableCell>
              <TableCell>{user.birthday}</TableCell>
              <TableCell>{user.city}</TableCell>
              <TableCell>{user.state}</TableCell>
              <TableCell>{user.sex}</TableCell>
              <TableCell>
                <div>
                  <Button color="secondary">
                    <Link to={`${ROUTES.USER}/${user.id}/edit`}>Edit</Link>
                  </Button>

                  <Button
                    className="ml-2"
                    color="danger"
                    onClick={handleOpen}
                    data-id={user.id}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal size="xs" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete user
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this user?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
                </Button>

                <Button color="danger" onPress={handleRemoveUser}>
                  Delete it
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
