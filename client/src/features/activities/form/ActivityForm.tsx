import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
  const { id } = useParams();
  const { createActivity, updateActivity, activity, isLoadingActivity } =
    useActivities(id);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (activity) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
      navigate(`/activities/${activity.id}`);
    } else {
      createActivity.mutateAsync(data as unknown as Activity, {
        onSuccess: (id) => {
          navigate(`/activities/${id}`);
        },
      });
    }
  };

  if (isLoadingActivity) return <Typography>Loading activity...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit Activity" : "CreateActivity"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField
          name="title"
          label="Title"
          defaultValue={activity && activity.title}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          defaultValue={activity && activity.description}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={activity && activity.category}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={
            activity && activity.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")
          }
        />
        <TextField
          name="city"
          label="City"
          defaultValue={activity && activity.city}
        />
        <TextField
          name="venue"
          label="Venue"
          defaultValue={activity && activity.venue}
        />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit" onClick={() => {}}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={createActivity.isPending || updateActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
