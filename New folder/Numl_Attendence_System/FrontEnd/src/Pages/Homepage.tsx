import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import SecondaryNav from "../components/SecondaryNav";
import StudentTable from "../components/StudentTable";

function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <SecondaryNav
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <StudentTable searchQuery={searchQuery} />
        </motion.div>
      </main>
    </div>
  );
}

export default Homepage;
