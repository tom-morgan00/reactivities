import { useEffect, useState } from "react";
import { Typography, Box, List, ListItemText } from "@mui/material";
import axios from "axios";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    async function fetchActivities() {
      const result = await axios.get<Activity[]>(
        "https://localhost:5001/api/activities"
      );
      setActivities(result.data);
    }
    fetchActivities();
  }, []);

  console.log(activities);

  return (
    <Box>
      <Typography variant="h3">Reactivities</Typography>
      <List>
        {activities.map((activity) => {
          return (
            <ListItemText key={activity.id}>{activity.title}</ListItemText>
          );
        })}
      </List>
    </Box>
  );
}

export default App;
