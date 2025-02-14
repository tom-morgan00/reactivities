import { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  useEffect(() => {
    async function fetchActivities() {
      const result = await axios.get<Activity[]>(
        "https://localhost:5001/api/activities"
      );
      setActivities(result.data);
    }
    fetchActivities();
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(
      activities.find((activity) => activity.id === id) || null
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
    if (activity.id) {
      setActivities(
        activities.map((currentActivity) =>
          currentActivity.id === activity.id ? activity : currentActivity
        )
      );
    } else {
      const newActivity = { ...activity, id: activities.length.toString() };
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity]);
    }

    setEditMode(false);
  };

  const handleDelete = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  return (
    <>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} cancelActivity={handleCancelActivity} />
      <Container maxWidth="xl" sx={{ py: 3, bgcolor: "#eeeeee" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}
        />
      </Container>
    </>
  );
}

export default App;
