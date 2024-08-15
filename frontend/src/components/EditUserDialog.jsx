import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function EditUserDialog({ open, handleClose, userData, handleSave }) {
  const [editedUser, setEditedUser] = useState(userData);

  useEffect(() => {
    setEditedUser(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    handleSave(editedUser);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="firstname"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
          value={editedUser?.firstname || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lastname"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
          value={editedUser?.lastname || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="role"
          label="Role"
          type="text"
          fullWidth
          variant="standard"
          value={editedUser?.role || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={editedUser?.email || ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}