import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectedActivity: Activity | null;
  selectActivity: (id: string) => void;
  cancelActivity: () => void;
  editMode: boolean;
  openForm: (id?: string) => void;
  closeForm: () => void;
  submitForm: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
};

export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelActivity,
  editMode,
  openForm,
  closeForm,
  submitForm,
  deleteActivity,
}: Props) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          closeForm={closeForm}
          deleteActivity={deleteActivity}
        />
      </Grid2>
      <Grid2 size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelActivity={cancelActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            submitForm={submitForm}
          />
        )}
      </Grid2>
    </Grid2>
  );
}
