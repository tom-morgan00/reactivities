import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Paper
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage:
          "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          gap: 3,
        }}
      >
        <Typography variant="h1" sx={{ display: "flex", gap: 3 }}>
          <Group sx={{ height: 110, width: 110 }} /> Reactivities
        </Typography>

        <Typography variant="h2">Welcome to Reactivities</Typography>
        <Button
          component={Link}
          to="/activities"
          variant="contained"
          size="large"
          sx={{ height: 80, borderRadius: 4, fontSize: "1.5rem" }}
        >
          Take me to activities
        </Button>
      </Box>
    </Paper>
  );
}
