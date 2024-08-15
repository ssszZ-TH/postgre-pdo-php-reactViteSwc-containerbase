import ResponsiveAppBar from "./components/ResponsiveAppBar";
// import Randomlongtxt from './components/Randomlongtxt'
import DataTable from "./components/DataTable";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UserCreateDialog from "./components/UserCreateDialog";
import EditUserDialog from "./components/EditUserDialog";

function App() {
  const [tabledata, setTableData] = useState(null);
  const [tableColumn, setTableColumn] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const getusers = (id = null) => {
    // ได้ทั้ง get all user ทั้ง get user by id
    // ใช้ meta programming conditional ternary operator
    const url =
      id === null
        ? "http://localhost:3001/user.php"
        : `http://localhost:3001/user.php?id=${id}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          // เปลียบเสมือนเรากด focus ที่ entity user
          console.log("get user raw result", result);
          if (result.status === "success") {
            resolve(result.data);
          } else {
            console.error("cannot get users from server");
            resolve(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          reject(error);
        });
    });
  };

  // มันคือ function ที่ไว้เรียกค่าจาก database มาเเสดงในตาราง เเละจัด column ให้พร้อม สำหรับการเเสดง data ดังกล่าวด้วย
  const focusOnUser = async () => {
    console.log("focus on entity user");
    const users = await getusers();
    setTableColumn(col_for_user);
    setTableData(users);
  };

  const handleEdit = async(id) => {
    console.log("edit user", id);
    const userToEdit = await getusers(id);
    console.log("user to edit", userToEdit);
    setEditingUser(userToEdit);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleSaveEdit = async (editedUser) => {
    try {
      const response = await fetch(
        `http://localhost:3001/user.php?id=${editedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        // Update the table data
        setTableData((prevData) =>
          prevData.map((user) =>
            user.id === editedUser.id ? editedUser : user
          )
        );
        console.log("User updated successfully");
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  function deleteUser(userId) {
    return fetch(`http://localhost:3001/user.php?id=${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // เพิ่ม headers อื่นๆ ตามความจำเป็น เช่น Authorization token
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User deleted successfully:", data);
        focusOnUser();
        return data;
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        throw error;
      });
  }

  const col_for_user = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "firstname", headerName: "First name" },
    { field: "lastname", headerName: "Last name" },
    { field: "role", headerName: "Role" },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteUser(params.row.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const init = async () => {
    focusOnUser();
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ResponsiveAppBar focusOnUser={focusOnUser} />
      <UserCreateDialog focusOnUser={focusOnUser} />
      <DataTable tabledata={tabledata} tableColumn={tableColumn} />
      <EditUserDialog
        open={editDialogOpen}
        handleClose={handleEditDialogClose}
        userData={editingUser}
        handleSave={handleSaveEdit}
      />
    </>
  );
}

export default App;
