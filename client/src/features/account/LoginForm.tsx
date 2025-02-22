import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../../lib/schemas/loginSchema";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAccount();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || "/activities");
      },
      onError: (errors) => {
        if (Array.isArray(errors)) {
          errors.forEach((err) => {
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
        <Typography variant="h4">Log in</Typography>
      </Box>
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
        Log in
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        Don't have an account?
        <Typography
          sx={{ ml: 2 }}
          component={Link}
          to="/register"
          color="primary"
        >
          Sign Up
        </Typography>
      </Typography>
    </Paper>
  );
}
