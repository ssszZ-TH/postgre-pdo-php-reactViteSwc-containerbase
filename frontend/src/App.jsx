import ResponsiveAppBar from "./components/ResponsiveAppBar";
// import Randomlongtxt from './components/Randomlongtxt'
import DataTable from "./components/DataTable";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const [tabledata, setTableData] = useState(null);
  const [tableColumn, setTableColumn] = useState(null);
  const [focusOn, setFocusOn] = useState('user');

  const focusOnUser = () => {
    console.log("focus on entity user");
    fetch("http://localhost:3001/user.php")
      .then((res) => res.json())
      .catch((error) => console.error(error))
      .then((result) => {
        // เปลียบเสมือนเรากด focus ที่ entity user
        setTableData(result.data);
        setTableColumn(columnsProgram);
      });
  };

  const handleEdit = (id) => {
    console.log("Edit user with id:", id);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log("Delete user with id:", id);
    // Add your delete logic here
  };

  const columnsProgram = [
    { field: "id", headerName: "ID" , width: 50},
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
          <IconButton onClick={() => handleDelete(params.row.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const init = async () => {
    fetch("http://localhost:3001/user.php")
      .then((res) => res.json())
      .catch((error) => console.error(error))
      .then((result) => {
        // เปลียบเสมือนเรากด focus ที่ entity user
        setTableData(result.data);
        setTableColumn(columnsProgram);
      });
  };

  useEffect(() => {
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ResponsiveAppBar focusOnUser={focusOnUser} />
      <IconButton onClick={() => handleEdit(params.row.id)}>
        <AddIcon />
      </IconButton>
      <DataTable tabledata={tabledata} tableColumn={tableColumn} />
      {/* <Randomlongtxt /> */}
    </>
  );
}

export default App;
