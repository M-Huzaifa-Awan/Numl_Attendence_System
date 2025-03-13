import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import ImgSrc from "../../assets/NUML-00.jpg";
import { Mail, Lock, ArrowRight } from "lucide-react";

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const [isTeacher, setIsTeacher] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onStudentSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      console.log("Student login:", data);
      // Add student login logic
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onTeacherSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      console.log("Teacher login:", data);
      // Add teacher login logic
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${ImgSrc})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 drop-shadow-md">
          NUML Attendance System
        </h1>
        <div className="h-1 w-20 bg-gray-800/80 mx-auto rounded-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-[420px]"
      >
        <Card className="p-8 space-y-6 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-lg">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 text-sm">Please login to continue</p>
          </div>

          <div className="bg-white/50 p-2 rounded-2xl backdrop-blur-md shadow-inner">
            <div className="relative flex items-center h-12 rounded-xl bg-white/50 p-1">
              <div
                className={`absolute transition-all duration-300 h-10 rounded-lg shadow-md ${
                  isTeacher
                    ? "w-1/2 translate-x-full bg-blue-900/20"
                    : "w-1/2 translate-x-0 bg-blue-900/20"
                }`}
              />
              <button
                onClick={() => setIsTeacher(false)}
                className={`flex-1 h-full rounded-lg z-10 transition-colors duration-300 ${
                  !isTeacher
                    ? "text-gray-800 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setIsTeacher(true)}
                className={`flex-1 h-full rounded-lg z-10 transition-colors duration-300 ${
                  isTeacher
                    ? "text-gray-800 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Teacher
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(
              isTeacher ? onTeacherSubmit : onStudentSubmit
            )}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label className="text-gray-700 text-sm font-medium">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 transition-colors group-hover:text-blue-700" />
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 pl-12 bg-white/50 border-white/20 text-gray-800 placeholder:text-gray-500 rounded-xl 
                  focus:bg-white/80 transition-all shadow-inner hover:bg-white/60
                  focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 text-sm font-medium">
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 transition-colors group-hover:text-blue-700" />
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  placeholder="Enter your password"
                  className="h-12 pl-12 bg-white/50 border-white/20 text-gray-800 placeholder:text-gray-500 rounded-xl 
                  focus:bg-white/80 transition-all shadow-inner hover:bg-white/60
                  focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-900 text-white 
              hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px]
              rounded-xl font-medium transition-all duration-300 disabled:opacity-50 
              disabled:hover:translate-y-0 group"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
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
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  {`Login as ${isTeacher ? "Teacher" : "Student"}`}
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;
