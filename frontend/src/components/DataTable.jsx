
import { DataGrid } from '@mui/x-data-grid';


export default function DataTable(props) {
  
  // eslint-disable-next-line react/prop-types
  const {tabledata, tableColumn} = props
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      //  หรือ ด้วย array ปล่าว เพื่อกัน error ในกรณีที่ data ยัง ไม่ได้รับ prop
        rows={tabledata || []}
        columns={tableColumn || []}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        // checkboxSelection
      />
    </div>
  );
}
