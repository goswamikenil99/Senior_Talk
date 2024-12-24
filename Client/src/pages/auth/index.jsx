import Background from "../../assets/login2.png";
import Victory from "../../assets/victory.svg";
import { FcGoogle } from "react-icons/fc"; // Import Google icon from react-icon
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE, OTP_ROUTE } from "@/lib/constants";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { validateEmail, validatePassword } from "@/utils/validation";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { useGoogleLogin } from "@react-oauth/google";

const Auth = () => {
  const navigate = useNavigate();
  // const [obj,setobj]=useState();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [temp, setTemp] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(""); // OTP state
  const [timer, setTimer] = useState(120); // Timer for OTP
  const [role, setRole] = useState(); // State for selecting role
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user_role = sessionStorage.getItem('role');
  if(user_role === "student"){
    console.log("kenil");
    window.open(
      "https://sites.google.com/ganpatuniversity.ac.in/guni-ai/home/exploring-scenarios-through-guided-case-studies",
      "_self",
      "noopener,noreferrer"
    );
    return;
  }
  if(user_role === "admin"){
    window.open(
      "https://sites.google.com/ganpatuniversity.ac.in/guni-ai/ai-for-admin-staff_1",
      "_self",
      "noopener,noreferrer"
    );
    return;
  }
  if(user_role === "professor"){
    window.open(
      "https://sites.google.com/ganpatuniversity.ac.in/guni-ai/ai-for-professors_1",
      "_self",
      "noopener,noreferrer"
    );
    return;
  }

  //////////////login with google

  // Initialize Google login
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Fetch user info
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        ).then((res) => res.json());
        toast.success("Google login successful!");
        try {
          const response = await apiClient.post(
            SIGNUP_ROUTE,
            {
              email: userInfo.email,
              password: "123456",
              role: role,
            },
            { withCredentials: true }
          );
          if (response.status == 201) {
            console.log(response.status);
            setUserInfo(response.data.user);
            if (response.data.user.role === "student") {
              sessionStorage.setItem("role", "student");
              window.open(
                "https://sites.google.com/ganpatuniversity.ac.in/guni-ai/home/exploring-scenarios-through-guided-case-studies",
                "_self",
                "noopener,noreferrer"
              );
            }
            if (response.data.user.role === "admin") {
              sessionStorage.setItem("role", "admin");
              window.open(
                "https://sites.google.com/ganpatuniversity.ac.in/guni-ai/ai-for-admin-staff_1",
                "_self",
                "noopener,noreferrer"
              );
            }
            if (response.data.user.role === "professor") {
              sessionStorage.setItem("role", "professor");
              window.open("https://sites.google.com/ganpatuniversity.ac.in/guni-ai/ai-for-professors_1", "_self", "noopener,noreferrer");
            }
            if (!response.data.user.role) {
              toast.error("Something is Missing in role");
            }
            setUserInfo(response.data.user);
          }
        } catch (e) {
          if (e.response.status == 404) {
            try {
              const response = await apiClient.post(
                LOGIN_ROUTE,
                {
                  email: userInfo.email,
                  password: "123456",
                },
                { withCredentials: true }
              );
              if (response.data.user.id) {
                setUserInfo(response.data.user);
                if (response.data.user.role === "student") {
                  // Storing a string in sessionStorage
                  sessionStorage.setItem("role", "student");
                  window.open(
                    "https://sites.google.com/ganpatuniversity.ac.in/guni-ai/home/exploring-scenarios-through-guided-case-studies",
                    "_self",
                    "noopener,noreferrer"
                  );
                }
                if (response.data.user.role === "admin") {
                  sessionStorage.setItem("role", "admin");
                  window.open(
                    "https://sites.google.com/ganpatuniversity.ac.in/guni-ai/ai-for-admin-staff_1",
                    "_self",
                    "noopener,noreferrer"
                  );
                }
                if (response.data.user.role === "professor") {
                  sessionStorage.setItem("role", "professor");
                  window.open(
                    "https://sites.google.com/ganpatuniversity.ac.in/guni-ai/ai-for-professors_1",
                    "_self",
                    "noopener,noreferrer"
                  );
                }
                if (!response.data.user.role) {
                  toast.error("Something is Missing in role");
                }
                setUserInfo(response.data.user);
              } else {
                console.log("error");
              }
            } catch (e) {
              if (e.response.status === Number(404)) {
                toast.error("User Not Found");
                return false;
              }
              if (e.response.status === Number(400)) {
                toast.error("Invalid Password");
                return false;
              } else {
                toast.error("unwanted Error!!");
              }
            }
          } else {
            toast.error("Internal Server Error");
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to retrieve Google user info.");
      }
    },
    onError: () => {
      toast.error("Google login failed!");
    },
  });
  /////////////////////////////////////////////////////////////

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Please Enter Proper Email Address.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };
  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Please Enter Proper Email Address.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same.");
      return false;
    }
    if (!role) {
      toast.error("Select Your Role.");
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    try {
      if (validateLogin()) {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.role === "student") {
            sessionStorage.setItem("role", "student");
            window.open(
              "https://sites.google.com/ganpatuniversity.ac.in/guni-ai/home/exploring-scenarios-through-guided-case-studies",
              "_self",
              "noopener,noreferrer"
            );
          }
          if (response.data.user.role === "admin") {
            sessionStorage.setItem("role", "admin");
            window.open("https://sites.google.com/ganpatuniversity.ac.in/guni-ai/ai-for-admin-staff_1", "_self", "noopener,noreferrer");
          }
          if (response.data.user.role === "professor") {
            sessionStorage.setItem("role", "professor");
            window.open("https://sites.google.com/ganpatuniversity.ac.in/guni-ai/ai-for-professors_1", "_self", "noopener,noreferrer");
          }
          if (!response.data.user.role) {
            toast.error("Something is Missing in role");
          }
        } else {
          console.log("error");
        }
      }
    } catch (e) {
      if (e.response.status === Number(404)) {
        toast.error("User Not Found");
        return false;
      }
      if (e.response.status === Number(400)) {
        toast.error("Invalid Password");
        return false;
      } else {
        toast.error("unwanted Error!!");
      }
    }
  };

  const handleSignup = async () => {
    if (!validateSignup()) return;

    try {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        {
          email,
          password,
          role, // Pass the role to the backend
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setUserInfo(response.data.user);
        if (response.data.user.role === "student") {
          sessionStorage.setItem("role", "student");
          window.open(
            "https://sites.google.com/ganpatuniversity.ac.in/guni-ai/home/exploring-scenarios-through-guided-case-studies",
            "_self",
            "noopener,noreferrer"
          );
        }
        if (response.data.user.role === "admin") {
          sessionStorage.setItem("role", "admin");
          window.open("https://sites.google.com/ganpatuniversity.ac.in/guni-ai/ai-for-admin-staff_1", "_self", "noopener,noreferrer");
        }
        if (response.data.user.role === "professor") {
          sessionStorage.setItem("role", "professor");
          window.open("https://sites.google.com/ganpatuniversity.ac.in/guni-ai/ai-for-professors_1", "_self", "noopener,noreferrer");
        }
        if (!response.data.user.role) {
          toast.error("Something is Missing in role");
        }
      }
    } catch (error) {
      // console.log(error.response)
      toast.error(error.response.data || "Signup failed");
    }
  };

  const handleModalSubmit = () => {
    if (role) {
      setIsModalOpen(false);
      toast.success(`Proceeding with Google login as ${role}`);
      googleLogin();
      // Continue with the Google login process here
    } else {
      toast.error("Please select a role before proceeding.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="min-h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-full max-w-screen-xl rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center p-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl md:text-6xl font-bold text-center">
                Welcome
              </h1>
              <img src={Victory} className="h-20 md:h-24" />
            </div>
            <p className="font-medium text-center text-gray-800">
              Fill in the details to get started with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 font-extrabold text-lg">
                GUNI AI
              </span>
            </p>
          </div>
          <div className="w-full">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  value="login"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  value="signup"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-5 mt-6">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-4" onClick={handleLogin}>
                  Login
                </Button>
                <Button
                  className="rounded-full p-4 flex items-center justify-center gap-3"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FcGoogle size={20} /> Login with Google
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-5 mt-6">
                {/* Signup Inputs */}
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-4"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {/* Radio Buttons */}
                <div className="flex justify-center my-6 space-x-6">
                  {/* Student, Professor, and Admin Buttons */}
                  {["student", "professor", "admin"].map((roleOption) => (
                    <label key={roleOption} className="cursor-pointer group">
                      <input
                        type="radio"
                        value={roleOption}
                        checked={role === roleOption}
                        onChange={() => setRole(roleOption)}
                        className="hidden"
                      />
                      <div
                        className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ease-in-out transform group-hover:scale-105 ${
                          role === roleOption
                            ? roleOption === "student"
                              ? "bg-blue-600 border-blue-600 text-white"
                              : roleOption === "professor"
                              ? "bg-purple-600 border-purple-600 text-white"
                              : "bg-green-600 border-green-600 text-white"
                            : "bg-white border-gray-300 text-gray-700 group-hover:border-gray-500"
                        }`}
                      >
                        {roleOption.charAt(0).toUpperCase() +
                          roleOption.slice(1)}
                      </div>
                    </label>
                  ))}
                </div>

                <Button className="rounded-full p-4" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* Image Section */}
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} className="max-h-[600px] xl:max-h-[700px]" />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-4">
              Select Your Role
            </h2>
            <div className="flex justify-center my-6 space-x-6">
              {["student", "professor", "admin"].map((roleOption) => (
                <label key={roleOption} className="cursor-pointer group">
                  <input
                    type="radio"
                    value={roleOption}
                    checked={role === roleOption}
                    onChange={() => setRole(roleOption)}
                    className="hidden"
                  />
                  <div
                    className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ease-in-out transform group-hover:scale-105 ${
                      role === roleOption
                        ? roleOption === "student"
                          ? "bg-blue-600 border-blue-600 text-white"
                          : roleOption === "professor"
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "bg-green-600 border-green-600 text-white"
                        : "bg-white border-gray-300 text-gray-700 group-hover:border-gray-500"
                    }`}
                  >
                    {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                  </div>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                className="rounded-full p-3 bg-gray-300 text-gray-700 hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="rounded-full p-3 bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleModalSubmit}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
