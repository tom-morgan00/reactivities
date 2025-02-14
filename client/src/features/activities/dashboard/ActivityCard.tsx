import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

type Props = {
  activity: Activity;
  selectActivity: (id: string) => void;
  closeForm: () => void;
  deleteActivity: (id: string) => void;
};

export default function ActivityCard({
  activity,
  selectActivity,
  closeForm,
  deleteActivity,
}: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {activity.date}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {activity.date}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">{activity.city}</Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
      >
        <Chip label={activity.title} variant="outlined" />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="medium"
            variant="contained"
            onClick={() => {
              closeForm();
              selectActivity(activity.id);
            }}
          >
            View
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={() => deleteActivity(activity.id)}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
