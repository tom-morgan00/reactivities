import { Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container
        maxWidth="xl"
        sx={{ py: 3, bgcolor: "#eeeeee", minHeight: "100vh" }}
      >
        <Outlet />
      </Container>
    </>
  );
}

export default App;
