import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { FolderPlus, Mail } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ThemeToggle />

      {/* FIX 1: Background should not catch clicks */}
      <div className="pointer-events-none">
        <StarBackground />
      </div>
      <Navbar/>

      {/* FIX 2: Content above background */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PROJECTS CARD */}
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="text-left cursor-pointer bg-card border rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
          >
            <FolderPlus size={42} className="mb-4 text-primary" />
            <h2 className="text-2xl font-semibold mb-2">
              Manage Projects
            </h2>
            <p className="text-muted-foreground">
              Add, edit, or delete portfolio projects.
            </p>
          </button>

          {/* MESSAGES CARD */}
          <button
            type="button"
            onClick={() => navigate("/admin/messages")}
            className="text-left cursor-pointer bg-card border rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
          >
            <Mail size={42} className="mb-4 text-primary" />
            <h2 className="text-2xl font-semibold mb-2">
              View Messages
            </h2>
            <p className="text-muted-foreground">
              Read messages sent from your portfolio contact form.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
