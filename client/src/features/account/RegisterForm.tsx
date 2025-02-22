import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import {
  RegisterSchema,
  registerSchema,
} from "../../lib/schemas/registerSchema";

export default function RegisterForm() {
  const { registerUser } = useAccount();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onError: (errors) => {
        if (Array.isArray(errors)) {
          errors.forEach((err) => {
            if (err.includes("DisplayName")) {
              setError("displayName", { message: err.message });
            }
            if (err.includes("Email")) {
              setError("email", { message: err });
            }
            if (err.includes("Password")) {
              setError("password", { message: err });
            }
          });
        } else {
          clearErrors();
        }
      },
    });
  };
  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        gap: 3,
        maxWidth: "md",
        flexDirection: "column",
        p: 3,
        mx: "auto",
        borderRadius: 3,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        color="secondary.main"
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Sign up</Typography>
      </Box>
      <TextInput label="Name" control={control} name="displayName" />
      <TextInput label="Email" control={control} name="email" />
      <TextInput
        label="Password"
        control={control}
        name="password"
        type="password"
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Sign up
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        Already have an account?
        <Typography sx={{ ml: 2 }} component={Link} to="/login" color="primary">
          Log in
        </Typography>
      </Typography>
    </Paper>
  );
}
