import { useEffect, useMemo, useState } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { LocationIQSuggestion } from "../../../lib/types";
import {
  Box,
  debounce,
  List,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  const locationUrl = `${import.meta.env.VITE_LOCATIONIQ_API_URL}?key=${
    import.meta.env.VITE_LOCATIONIQ_API_TOKEN
  }&limit=5&dedupe=1`;
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (field.value && typeof field.value === "object") {
      setInputValue(field.value.venue || "");
    } else {
      setInputValue(field.value || "");
    }
  }, [field, setInputValue]);

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
        }
        setIsLoading(true);

        try {
          const result = await axios.get<LocationIQSuggestion[]>(
            `${locationUrl}&q=${query}`
          );
          setSuggestions(result.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }, 500),
    [locationUrl]
  );

  const handleChange = async (value: string) => {
    field.onChange(value);
    await fetchSuggestions(value);
  };

  const handleSelect = (location: LocationIQSuggestion) => {
    const city =
      location.address?.city ||
      location.address?.town ||
      location.address?.village;
    const venue = location.display_name;
    const longitude = location.lon;
    const latitude = location.lat;

    setInputValue(venue);
    field.onChange({ city, venue, longitude, latitude });
    setSuggestions([]);
  };

  return (
    <Box>
      <TextField
        {...props}
        onChange={(e) => handleChange(e.target.value)}
        value={inputValue}
        fullWidth
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
      {isLoading && <Typography>Loading...</Typography>}
      {suggestions.length > 0 && (
        <List sx={{ border: 1 }}>
          {suggestions.map((suggestion) => (
            <ListItemButton
              divider
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
