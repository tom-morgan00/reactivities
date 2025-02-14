import { Group } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  MenuItem,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";

type Props = {
  openForm: (id?: string) => void;
  cancelActivity: () => void;
};

export default function NavBar({ openForm, cancelActivity }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuItem sx={{ display: "flex", gap: 2 }}>
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight="bold">
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex" }}>
              <MenuItem
                sx={{
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Activities
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                About
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Contact
              </MenuItem>
            </Box>
            <Button
              variant="contained"
              color="warning"
              size="large"
              onClick={() => {
                cancelActivity();
                openForm();
              }}
            >
              Create
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
