import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function UserCreateDialog(props) {
  const {focusOnUser} = props;
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setUserData({
      firstname: "",
      lastname: "",
      email: "",
      role: "",
    });
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (result.status === "success") {
        console.log("บันทึกข้อมูลสำเร็จ:", result.message);
        //focusOnUser คือการ refresh users table
        focusOnUser();
        handleClose();
      } else {
        console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", result.message);
        // อาจจะแสดง error message ให้ผู้ใช้เห็น
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเชื่อมต่อกับ server:", error);
      // อาจจะแสดง error message ให้ผู้ใช้เห็น
    }
  };

  return (
    <div>
      <IconButton 
        color="primary" 
        onClick={handleClickOpen}
        aria-label="เพิ่มผู้ใช้ใหม่"
      >
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>กรอกข้อมูลผู้ใช้</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            label="ชื่อ"
            type="text"
            fullWidth
            value={userData.firstname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="lastname"
            label="นามสกุล"
            type="text"
            fullWidth
            value={userData.lastname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="อีเมล"
            type="email"
            fullWidth
            value={userData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            type="text"
            fullWidth
            value={userData.role}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={handleSubmit} color="primary">
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserCreateDialog;
