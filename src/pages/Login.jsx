import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";

import toast from "react-hot-toast";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { userNameValidator } from "../utils/Validators";

const Login = () => {
  const [isLogin, setisLogin] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state

  const Name = useInputValidation("");
  const Bio = useInputValidation("");
  const Username = useInputValidation("", userNameValidator);
  const Password = useStrongPassword();

  const pfp = useFileHandler("single");

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("name", Name.value);
    formData.append("bio", Bio.value);
    formData.append("username", Username.value);
    formData.append("password", Password.value);
    formData.append("avatar", pfp.file);
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: Username.value,
          password: Password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f7f7f7",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5" sx={{ color: "#1a1a1a" }}>
                Login
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={Username.value}
                  onChange={Username.changeHandler}
                  InputLabelProps={{ style: { color: "#1a1a1a" } }}
                  InputProps={{
                    style: { backgroundColor: "white" },
                  }}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={Password.value}
                  onChange={Password.changeHandler}
                  InputLabelProps={{ style: { color: "#1a1a1a" } }}
                  InputProps={{
                    style: { backgroundColor: "white" },
                  }}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: "#1a73e8",
                    "&:hover": { backgroundColor: "#1558b0" },
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}{" "}
                </Button>
                <Typography textAlign={"center"} m={"1rem"} color={"#1a1a1a"}>
                  OR
                </Typography>
                <Button
                  variant="text"
                  sx={{ color: "#1a73e8" }}
                  fullWidth
                  onClick={() => setisLogin(false)}
                >
                  Register
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ color: "#1a1a1a" }}>
                Register
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleRegister}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                      backgroundColor: "#e3f2fd",
                    }}
                    src={pfp.preview}
                  ></Avatar>

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon></CameraAltIcon>
                      <VisuallyHiddenInput
                        type="file"
                        onChange={pfp.changeHandler}
                      ></VisuallyHiddenInput>
                    </>
                  </IconButton>
                </Stack>

                {pfp.error && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{
                      m: "1rem auto",
                      width: "fit-content",
                      display: "block",
                    }}
                  >
                    {pfp.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={Name.value}
                  onChange={Name.changeHandler}
                  InputLabelProps={{ style: { color: "#1a1a1a" } }}
                  InputProps={{
                    style: { backgroundColor: "white" },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={Bio.value}
                  onChange={Bio.changeHandler}
                  InputLabelProps={{ style: { color: "#1a1a1a" } }}
                  InputProps={{
                    style: { backgroundColor: "white" },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={Username.value}
                  onChange={Username.changeHandler}
                  InputLabelProps={{ style: { color: "#1a1a1a" } }}
                  InputProps={{
                    style: { backgroundColor: "white" },
                  }}
                />

                {Username.error && (
                  <Typography color="error" variant="caption">
                    {Username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={Password.value}
                  onChange={Password.changeHandler}
                  InputLabelProps={{ style: { color: "#1a1a1a" } }}
                  InputProps={{
                    style: { backgroundColor: "white" },
                  }}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: "#1a73e8",
                    "&:hover": { backgroundColor: "#1558b0" },
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Register"
                  )}{" "}
                  {/* Show loader */}
                </Button>
                <Typography textAlign={"center"} m={"1rem"} color={"#1a1a1a"}>
                  OR
                </Typography>
                <Button
                  variant="text"
                  sx={{ color: "#1a73e8" }}
                  fullWidth
                  onClick={() => setisLogin(true)}
                >
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
