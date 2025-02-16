import { Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";

const Counter = observer(function Counter() {
  const { counterStore } = useStore();
  return (
    <>
      <Typography gutterBottom variant="h4">
        {counterStore.title}
      </Typography>
      <Typography variant="h6">{counterStore.counter}</Typography>
      <Button onClick={() => counterStore.increment()}>Increment</Button>
      <Button onClick={() => counterStore.decrement()}>Decrement</Button>
    </>
  );
});

export default Counter;
