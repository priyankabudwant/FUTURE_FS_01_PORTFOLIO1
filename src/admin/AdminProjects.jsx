import { useEffect, useState } from "react";
import axios from "axios";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    demoUrl: "",
    githubUrl: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects");
      setProjects(res.data);
    } catch {
      setError("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/projects", {
        ...form,
        tags: form.tags.split(",").map(tag => tag.trim()),
      });

      setForm({
        title: "",
        description: "",
        tags: "",
        demoUrl: "",
        githubUrl: "",
      });

      fetchProjects();
    } catch {
      setError("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await axios.delete(`http://localhost:5000/projects/${id}`);
      fetchProjects();
    } catch {
      setError("Failed to delete project");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ThemeToggle />
      <StarBackground />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Admin Panel – Projects
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-6">{error}</p>
        )}

        {/* ADD PROJECT CARD */}
        <div className="bg-card border rounded-xl p-6 shadow-sm mb-12">
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>

          <form onSubmit={addProject} className="grid gap-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Project Title"
              className="input"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Project Description"
              className="input h-24 resize-none"
              required
            />

            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Tags (React, Node, Mongo)"
              className="input"
            />

            <input
              name="demoUrl"
              value={form.demoUrl}
              onChange={handleChange}
              placeholder="Demo URL"
              className="input"
            />

            <input
              name="githubUrl"
              value={form.githubUrl}
              onChange={handleChange}
              placeholder="GitHub URL"
              className="input"
            />

            <button
              disabled={loading}
              className="bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Project"}
            </button>
          </form>
        </div>

        {/* PROJECT LIST */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-card border rounded-xl p-5 flex justify-between items-start gap-4 shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => deleteProject(project._id)}
                className="text-red-500 hover:text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminProjects;
