import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  activity: Activity | null;
  cancelActivity: () => void;
  openForm: (id?: string) => void;
};

export default function ActivityDetails({
  activity,
  cancelActivity,
  openForm,
}: Props) {
  return (
    activity && (
      <Card>
        <CardMedia
          component="img"
          src={`/images/categoryImages/${activity.category}.jpg`}
        />
        <CardContent>
          <Typography variant="h5">{activity.title}</Typography>
          <Typography variant="subtitle1" fontWeight="light">
            {activity.date}
          </Typography>
          <Typography variant="body1">{activity.description}</Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={() => openForm(activity.id)}>
            Edit
          </Button>
          <Button color="inherit" onClick={cancelActivity}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    )
  );
}
