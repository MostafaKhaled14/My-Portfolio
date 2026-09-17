import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import HomeManager from "./HomeManager";
import ProjectsManager from "./ProjectsManager";
import ContactManager from "./ContactManager";
import MessagesManager from "./MessagesManager";
import BlogsManager from "./BlogsManager";
import AboutManager from "./AboutManager";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Wrong email or password", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-myblack">
        <form onSubmit={handleLogin} className="bg-white dark:bg-pale p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gold">Admin Login</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border rounded-lg"
            required
          />
          <button type="submit" className="w-full bg-gold text-white py-3 rounded-lg font-bold hover:opacity-90">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-myblack p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-6 py-2 rounded-lg font-bold ${activeTab === "home" ? "bg-gold text-white" : "bg-gray-200 dark:bg-pale"}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-2 rounded-lg font-bold ${activeTab === "projects" ? "bg-gold text-white" : "bg-gray-200 dark:bg-pale"}`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-6 py-2 rounded-lg font-bold ${activeTab === "contact" ? "bg-gold text-white" : "bg-gray-200 dark:bg-pale"}`}
          >
            Contact Info
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-6 py-2 rounded-lg font-bold ${activeTab === "messages" ? "bg-gold text-white" : "bg-gray-200 dark:bg-pale"}`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-6 py-2 rounded-lg font-bold ${activeTab === "blogs" ? "bg-gold text-white" : "bg-gray-200 dark:bg-pale"}`}
          >
            Blogs
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-6 py-2 rounded-lg font-bold ${activeTab === "about" ? "bg-gold text-white" : "bg-gray-200 dark:bg-pale"}`}
          >
            About
          </button>
        </div>

        {/* Content */}
        {activeTab === "home" && <HomeManager />}
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "contact" && <ContactManager />}
        {activeTab === "messages" && <MessagesManager />}
        {activeTab === "blogs" && <BlogsManager />}
        {activeTab === "about" && <AboutManager />}
      </div>
    </div>
  );
}
