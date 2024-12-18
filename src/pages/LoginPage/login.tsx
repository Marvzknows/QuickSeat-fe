import InputField from "../../components/input/input";
import Button from "../../components/buttons/Buttons";
import Checkbox from "../../components/checkbox/CheckBox";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../types/api";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Record<string, string>>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const HandleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/api/login`, credentials);

      if (response.status >= 200 && response.data) {
        context.saveSession(response.data);
        if (response.data.user_information.role === "admin") {
          navigate("/admin/dashboard");
        }

        if (response.data.user_information.role === "user") {
          navigate("/");
        }
      }
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const HandleCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="min-h-screen h-screen flex flex-col justify-center items-center bg-secondary">
        <div className="flex flex-col items-center w-80 max-w-screen-lg md:w-[30%] bg-white rounded-lg p-3 shadow-lg">
          <h2 className="block antialiased tracking-normal font-sans text-4xl text-inherit font-bold mb-4">
            Sign In
          </h2>
          <p className="block antialiased font-sans font-semibold text-blue-950 text-lg">
            Enter your credentials to sign in
          </p>

          <form
            onSubmit={HandleOnSubmit}
            className="flex flex-col mt-8 mb-2 w-full"
          >
            <InputField
              onChange={HandleCredentials}
              name="username"
              id="username"
              type={"text"}
              label="Username"
              placeholder="Username"
            />
            <InputField
              onChange={HandleCredentials}
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="*******"
            />
            <div className="m-2">
              <Checkbox
                onChange={() => setShowPassword(!showPassword)}
                id="showPassword"
                label="Show password?"
              />
            </div>

            <div className="mx-2 mt-3">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Login;
