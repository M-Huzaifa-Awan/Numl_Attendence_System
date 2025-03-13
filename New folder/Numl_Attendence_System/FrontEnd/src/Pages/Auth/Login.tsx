import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LucideSchool,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import ImgSrc from "../../assets/NUML-00.jpg";
import LogoSrc from "../../assets/numl-logo-8250E1FBC3-seeklogo.com.svg";

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      console.log(
        `${role.charAt(0).toUpperCase() + role.slice(1)} login:`,
        data
      );
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchRole = (newRole: "student" | "teacher") => {
    if (role !== newRole) {
      reset();
      setRole(newRole);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={ImgSrc}
          alt="NUML Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img
              src={LogoSrc}
              alt="NUML Logo"
              className="w-60 h-auto mx-auto mb-6"
            />
            <h1 className="text-5xl font-bold text-white mb-6">
              NUML Attendance System
            </h1>
            <div className="h-1 w-20 bg-blue-400 mx-auto rounded-full mb-6" />
            <p className="text-white/80 text-lg max-w-md mx-auto">
              Track attendance, monitor progress, and ensure academic excellence
              with our state-of-the-art attendance management system.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-10 text-center lg:hidden">
            <img
              src={LogoSrc}
              alt="NUML Logo"
              className="w-24 h-auto mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-900">
              NUML Attendance System
            </h1>
            <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full mt-2" />
          </div>

          {/* Login Card */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8 overflow-hidden"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {/* Header */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600 mt-1">Please sign in to continue</p>
            </div>

            {/* Role Selector */}
            <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
              <div className="relative w-full h-12 rounded-lg">
                <motion.div
                  className="absolute h-10 top-1 rounded-lg bg-white shadow-md"
                  initial={false}
                  animate={{
                    left: role === "student" ? "2%" : "52%",
                    width: "46%",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <div className="relative z-10 flex h-full">
                  <button
                    type="button"
                    onClick={() => switchRole("student")}
                    className={`flex items-center justify-center gap-2 flex-1 rounded-lg transition-colors ${
                      role === "student"
                        ? "text-blue-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <User size={18} />
                    <span className="font-medium">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => switchRole("teacher")}
                    className={`flex items-center justify-center gap-2 flex-1 rounded-lg transition-colors ${
                      role === "teacher"
                        ? "text-blue-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <LucideSchool size={18} />
                    <span className="font-medium">Teacher</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Login Form - Fixed Height Container */}
            <div className="relative" style={{ minHeight: "270px" }}>
              <AnimatePresence mode="wait">
                <motion.form
                  key={role}
                  initial={{ opacity: 0, position: "absolute", width: "100%" }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, position: "absolute" }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address",
                          },
                        })}
                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl outline-none focus:ring-2 ${
                          errors.email
                            ? "border-red-300 focus:ring-red-100"
                            : "border-transparent focus:ring-blue-100 focus:bg-white"
                        } transition duration-200`}
                        type="text"
                        placeholder={
                          role === "student"
                            ? "student@numl.edu.pk"
                            : "teacher@numl.edu.pk"
                        }
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-red-500 text-sm pl-1 h-5"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 rounded-xl outline-none focus:ring-2 ${
                          errors.password
                            ? "border-red-300 focus:ring-red-100"
                            : "border-transparent focus:ring-blue-100 focus:bg-white"
                        } transition duration-200`}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-red-500 text-sm pl-1 h-5"
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium
                     hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:shadow-inner
                     flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed
                     transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      <>
                        <span>
                          Sign in as{" "}
                          {role === "student" ? "Student" : "Teacher"}
                        </span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </AnimatePresence>
            </div>

            {/* Register Link - Outside the form container to maintain stable height */}
            <AnimatePresence>
              {role === "student" && (
                <motion.div
                  key="register-link"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1.5rem" }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-center text-sm text-gray-500 overflow-hidden"
                >
                  Don't have an account yet?{" "}
                  <a
                    href="#"
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Register
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-8 text-center text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {new Date().getFullYear()} National University of Modern
            Languages. All rights reserved.
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
