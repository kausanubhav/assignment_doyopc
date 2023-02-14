import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import axios from "axios"
import { Box } from "@mui/system"
import { styled, createTheme, ThemeProvider, Typography } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import Avatar from "@mui/material/Avatar"
import { useNavigate } from "react-router-dom"

const API_URL = "/read/all"

export default function Home({ setIsLoggedIn }) {
  const user = JSON.parse(localStorage.getItem("user"))

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL)
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

  //handleleave function
  const navigate=useNavigate()
  
  const handleLeave=()=>{
    setIsLoggedIn(false);
    localStorage.removeItem('user')
    navigate('/')
  }

  const columns = [
    { field: "email", headerName: "Email", width: 300 },

    { field: "firstName", headerName: "First Name", width: 300 },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 300,
    },
  ]

  const customTheme = createTheme({
    palette: {
      primary: {
        main: deepPurple[500],
      },
    },
    typography:{
      fontSize:12
    }
  })

  const StyledComponent = styled(Avatar)`
    ${({ theme }) => `
  cursor: pointer;
  font-size: ${theme.typography.fontSize}px;

  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: ${theme.palette.secondary.main};
    transform: scale(1.3);
  }
  `}
  `

  return (
    <ThemeProvider theme={customTheme}>
      <Box>
        <Typography variant="h2" sx={{ textAlign: "center", margin: "20px" }}>
          Welcome {user?.firstName}
        </Typography>
        <Box sx={{ margin:"10px",display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ textAlign: "center", margin: "20px" }}>
            Check out your clan members
          </Typography>
          <StyledComponent onClick={handleLeave}>Leave</StyledComponent>
        </Box>
        <Box className="box" sx={{ height: 400, width: "100%" }}>
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
      </Box>
    </ThemeProvider>
  )
}
