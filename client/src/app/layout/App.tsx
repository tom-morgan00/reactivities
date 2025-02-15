import { useState } from "react";
import { Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";
function App() {
  const [editMode, setEditMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(
      activities!.find((activity) => activity.id === id) || null
    );
  };

  const handleCancelActivity = () => {
    setSelectedActivity(null);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  const handleSubmitForm = (activity: Activity) => {
    // if (activity.id) {
    //   setActivities(
    //     activities!.map((currentActivity) =>
    //       currentActivity.id === activity.id ? activity : currentActivity
    //     )
    //   );
    // } else {
    //   const newActivity = { ...activity, id: activities!.length.toString() };
    //   setSelectedActivity(newActivity);
    //   setActivities([...activities!, newActivity]);
    // }

    setEditMode(false);
    console.log(activity);
  };

  const handleDelete = (id: string) => {
    // setActivities(activities!.filter((activity) => activity.id !== id));
    console.log(id);
  };

  return (
    <>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} cancelActivity={handleCancelActivity} />
      <Container
        maxWidth="xl"
        sx={{ py: 3, bgcolor: "#eeeeee", minHeight: "100vh" }}
      >
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelActivity={handleCancelActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleCloseForm}
            deleteActivity={handleDelete}
          />
        )}
      </Container>
    </>
  );
}

export default App;
