import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    image: "",
    category: "projects",
    technology: "react_JS",
    order: 1,
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, "projects"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, "projects", editId), {
          ...formData,
          order: Number(formData.order),
        });
      } else {
        await addDoc(collection(db, "projects"), {
          ...formData,
          order: Number(formData.order),
        });
      }
      setFormData({
        title: "",
        url: "",
        image: "",
        category: "projects",
        technology: "react_JS",
        order: 1,
      });
      setEditId(null);
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Error saving project");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || "",
      url: project.url || "",
      image: project.image || "",
      category: project.category || "projects",
      technology: project.technology || "react_JS",
      order: project.order || 1,
    });
    setEditId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setShowForm(true);
          setEditId(null);
          setFormData({
            title: "",
            url: "",
            image: "",
            category: "projects",
            technology: "react_JS",
            order: projects.length + 1,
          });
        }}
        className="bg-gold text-white px-6 py-3 rounded-lg font-bold mb-6"
      >
        + Add New Project
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-pale p-6 rounded-xl mb-8 shadow">
          <h2 className="text-xl font-bold mb-4">{editId ? "Edit Project" : "Add Project"}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="url"
              placeholder="Project URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="p-3 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              className="p-3 border rounded-lg"
            />

            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="p-3 border rounded-lg"
            >
              <option value="projects">projects</option>
              <option value="tasks">tasks</option>
            </select>

            <select
              value={formData.technology}
              onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
              className="p-3 border rounded-lg"
            >
              <option value="react_JS">react_JS</option>
              <option value="bootstrap">bootstrap</option>
              <option value="css">css</option>
              <option value="vanilla_JS">vanilla_JS</option>
              <option value="html">html</option>
            </select>
          </div>

          <div className="flex gap-4 mt-6">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">
              {editId ? "Update" : "Add"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-6 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-pale rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gold text-white">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Technology</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b">
                <td className="p-3">{project.order}</td>
                <td className="p-3 font-medium">{project.title}</td>
                <td className="p-3">{project.category}</td>
                <td className="p-3">{project.technology}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(project)} className="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
