import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";
import { useLocation, useNavigate } from "react-router";
import { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const loginUser = useMutation({
    mutationFn: async (creds: LoginSchema) => {
      await agent.post("/login?useCookies=true", creds);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const registerUser = useMutation({
    mutationFn: async (creds: RegisterSchema) => {
      await agent.post("/register", creds);
    },
    onSuccess: async () => {
      toast.success("Register successful");
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post("/account/logout");
    },
    onSuccess: async () => {
      await queryClient.removeQueries({
        queryKey: ["user"],
      });
      await queryClient.removeQueries({
        queryKey: ["activities"],
      });
      navigate("/");
    },
  });

  const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await agent.get<User>("/account/user-info");
      return response.data;
    },
    enabled:
      !queryClient.getQueryData(["user"]) &&
      location.pathname !== "/register" &&
      location.pathname !== "/login",
  });

  return {
    loginUser,
    logoutUser,
    registerUser,
    currentUser,
    loadingUserInfo,
  };
};
