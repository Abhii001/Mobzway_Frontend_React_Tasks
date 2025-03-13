import React, { useState } from "react";
import { auth, loginUser, signUpUser } from "../utilis/FirebaseData";
import { useNavigate } from "react-router-dom";
import TodoDashboard from "./TodoDashboard";

const Task06 = ({ setUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let userCredential;
      if (isLogin) {
        console.log("🔹 Logging in...");
        userCredential = await loginUser(email, password);
        console.log("Login Successful", userCredential.user);
        setUser(userCredential.user);
        navigate("/TodoDashboard");
      } else {
        console.log("🔹 Signing Up...");
        if (!firstName.trim() || !lastName.trim()) {
          setError("Please enter your first and last name.");
          return;
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }

        userCredential = await signUpUser(email, password);
        console.log("Sign-Up Successful", userCredential.user);
        alert("Account created successfully! You can now log in.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("🔥 Error:", err);
      const errorMessages = {
        "auth/email-already-in-use": "This email is already registered. Try logging in.",
        "auth/invalid-email": "Invalid email format.",
        "auth/wrong-password": "Incorrect password.",
        "auth/user-not-found": "No account found with this email.",
      };
      setError(errorMessages[err.code] || "Authentication failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
        
        <form onSubmit={handleAuth}>
          {/* Name fields (only for Sign Up) */}
          {!isLogin && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Email and Password fields */}
          <div className="space-y-4 mt-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Switch between Login and Sign Up */}
        <p
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-center text-blue-600 cursor-pointer hover:underline"
        >
          {isLogin ? "New user? Sign Up" : "Already have an account? Login"}
        </p>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Task06;
