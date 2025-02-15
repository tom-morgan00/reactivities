import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  activity: Activity | null;
  closeForm: () => void;
};

export default function ActivityForm({ activity, closeForm }: Props) {
  const { createActivity, updateActivity, isPending } = useActivities();
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
      closeForm();
    } else {
      await createActivity.mutateAsync(data as unknown as Activity);
      closeForm();
    }
  };
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create activity
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
            activity
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
          <Button color="inherit" onClick={closeForm}>
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
