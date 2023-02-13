import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import axios from "axios"
import { Box } from "@mui/system"

const API_URL = "/read/all"

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"))

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL)
        console.log(response.data)
        setData(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    let isApiSubscribed = true
    if (isApiSubscribed) {
      fetchUsers()
    }
    return () => {
      isApiSubscribed = false
    }
  }, [])

  const columns = [
    { field: "email", headerName: "Email", width: 300 },

    { field: "firstName", headerName: "First Name", width: 300 },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 300,
    },
  ]

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px" }}>Welcome {user?.firstName}</h1>

      <h3 style={{ textAlign: "center", margin: "20px" }}>Check out your clan members</h3>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.email}
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </div>
  )
}
