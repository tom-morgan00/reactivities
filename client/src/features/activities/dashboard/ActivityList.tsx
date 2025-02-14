import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  closeForm: () => void;
  deleteActivity: (id: string) => void;
};

export default function ActivityList({
  activities,
  selectActivity,
  closeForm,
  deleteActivity,
}: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          selectActivity={selectActivity}
          closeForm={closeForm}
          deleteActivity={deleteActivity}
        />
      ))}
    </Box>
  );
}
