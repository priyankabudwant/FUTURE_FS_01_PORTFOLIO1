import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";

export const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const res = await fetch("http://localhost:5000/api/messages");
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    await fetch(`http://localhost:5000/api/messages/${id}`, {
      method: "DELETE",
    });
    fetchMessages(); // refresh list
  };

  if (loading) {
    return <p className="text-center mt-10">Loading messages...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <ThemeToggle/>
      <StarBackground/>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin – Messages
      </h1>

      {messages.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No messages yet
        </p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="border rounded-lg p-5 shadow-sm bg-card"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{msg.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {msg.email}
                  </p>
                </div>

                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <p className="mt-4">{msg.message}</p>

              <p className="text-xs text-muted-foreground mt-3">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
