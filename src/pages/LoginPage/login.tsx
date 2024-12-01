import InputField from "../../components/input/input";
import Button from "../../components/buttons/Buttons";
import Checkbox from "../../components/checkbox/CheckBox";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState<Record<string, string>>({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const HandleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = credentials
    if(!username.trim() || !password.trim()) {
        toast.error("Please fill in all fields");
        return;
    }

    console.table(credentials);
  };

  const HandleCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setCredentials((prev) => ({ ...prev, username: value }));
      return;
    }

    if (name === "password") {
      setCredentials((prev) => ({ ...prev, password: value }));
      return;
    }
  };

  return (
    <>
      <div className="min-h-screen h-screen flex flex-col justify-center items-center bg-secondary">
        <div className="flex flex-col items-center w-80 max-w-screen-lg lg:w-[22%] bg-white rounded-lg p-3 shadow-lg">
          <h2 className="block antialiased tracking-normal font-sans text-4xl text-inherit font-bold mb-4">
            Sign In
          </h2>
          <p className="block antialiased font-sans font-semibold text-blue-950 text-lg">
            Enter your credentials to sign in
          </p>

          <form onSubmit={HandleOnSubmit} className="flex flex-col mt-8 mb-2 w-full">
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
              <Button type="submit" variant="primary" className="w-full">
                SIGN IN
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
