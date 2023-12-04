import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { GET_AGENTS_API, GET_ARCHIVED_AGENTS_API } from "../../Const";

const columns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "type", headerName: "Type", width: 150 },
  { field: "role", headerName: "Role", width: 150 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "tag", headerName: "Tag", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "lastRun", headerName: "Last Run", width: 150 },
];

const ArchivedAgent = () => {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.login.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(GET_ARCHIVED_AGENTS_API, config);
        const mappedData = response.data.map((item) => ({
          ...item,
          id: item._id, // Add this line to map _id to id
        }));
        setData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div>Archived Agent</div>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default ArchivedAgent;
