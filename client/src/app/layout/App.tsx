import { Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();
  return (
    <>
      <CssBaseline />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container
            maxWidth="xl"
            sx={{ py: 3, bgcolor: "#eeeeee", minHeight: "100vh" }}
          >
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
