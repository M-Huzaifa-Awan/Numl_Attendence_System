import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Pages/Homepage";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/auth"
        element={
          <>
            <div>dfdsf</div>
          </>
        }
      />

      {/* Protected Routes */}
      <Route path="/" element={<Homepage />} />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
