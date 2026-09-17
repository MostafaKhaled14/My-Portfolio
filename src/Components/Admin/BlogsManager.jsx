import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    p1: "",
    p2: "",
    p3: "",
    names: "mostafa",
    date: "",
    keywords: "",
    order: 1,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blogData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        details: {
          p1: formData.p1,
          p2: formData.p2,
          p3: formData.p3,
        },
        info: {
          names: formData.names,
          date: formData.date,
          keywords: formData.keywords,
        },
        order: Number(formData.order),
        createdAt: serverTimestamp(),
      };

      if (editId) {
        await updateDoc(doc(db, "blogs", editId), blogData);
      } else {
        await addDoc(collection(db, "blogs"), blogData);
      }

      setFormData({
        title: "",
        description: "",
        image: "",
        p1: "",
        p2: "",
        p3: "",
        names: "mostafa",
        date: "",
        keywords: "",
        order: 1,
      });
      setEditId(null);
      setShowForm(false);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Error saving blog");
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title || "",
      description: blog.description || "",
      image: blog.image || "",
      p1: blog.details?.p1 || "",
      p2: blog.details?.p2 || "",
      p3: blog.details?.p3 || "",
      names: blog.info?.names || "mostafa",
      date: blog.info?.date || "",
      keywords: blog.info?.keywords || "",
      order: blog.order || 1,
    });
    setEditId(blog.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await deleteDoc(doc(db, "blogs", id));
      fetchBlogs();
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
            description: "",
            image: "",
            p1: "",
            p2: "",
            p3: "",
            names: "mostafa",
            date: "",
            keywords: "",
            order: blogs.length + 1,
          });
        }}
        className="bg-gold text-white px-6 py-3 rounded-lg font-bold mb-6"
      >
        + Add New Blog
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-pale p-6 rounded-xl mb-8 shadow space-y-4">
          <h2 className="text-xl font-bold mb-4">{editId ? "Edit Blog" : "Add Blog"}</h2>

          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Short Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="url"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            placeholder="Paragraph 1"
            value={formData.p1}
            onChange={(e) => setFormData({ ...formData, p1: e.target.value })}
            className="w-full p-3 border rounded-lg h-24"
            required
          />
          <textarea
            placeholder="Paragraph 2"
            value={formData.p2}
            onChange={(e) => setFormData({ ...formData, p2: e.target.value })}
            className="w-full p-3 border rounded-lg h-24"
          />
          <textarea
            placeholder="Paragraph 3"
            value={formData.p3}
            onChange={(e) => setFormData({ ...formData, p3: e.target.value })}
            className="w-full p-3 border rounded-lg h-24"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Author name"
              value={formData.names}
              onChange={(e) => setFormData({ ...formData, names: e.target.value })}
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Date (e.g. 14 january 2025)"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Keywords"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="p-3 border rounded-lg"
            />
          </div>

          <input
            type="number"
            placeholder="Order"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />

          <div className="flex gap-4">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">
              {editId ? "Update" : "Add"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-6 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Blogs List */}
      <div className="space-y-4">
        {blogs.length === 0 ? (
          <p className="text-center py-10">No blogs yet</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="bg-white dark:bg-pale p-5 rounded-xl shadow flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{blog.title}</h3>
                <p className="text-sm text-gray-500">{blog.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Order: {blog.order} | {blog.info?.date}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(blog)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                  Edit
                </button>
                <button onClick={() => handleDelete(blog.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
