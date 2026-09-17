import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function HomeManager() {
  const [homeInfo, setHomeInfo] = useState({
    name: "I'm Mostafa Khaled.",
    jobTitle: "Web Designer",
    description:
      "I'm a Egyptian based web designer & front-end developer focused on craiting clean & user-friendly experiences, i am passionate about building excellent software that improves the lives of those around me.",
    imageUrl: "",
  });

  useEffect(() => {
    fetchHomeInfo();
  }, []);

  const fetchHomeInfo = async () => {
    try {
      const docRef = doc(db, "homeInfo", "main");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHomeInfo((prev) => ({ ...prev, ...docSnap.data() }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "homeInfo", "main"), homeInfo);
      alert("Home info saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-4">Home Page Info</h2>
      <form onSubmit={handleSave} className="bg-white dark:bg-pale p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Profile Image URL</label>
          <input
            type="url"
            value={homeInfo.imageUrl || ""}
            onChange={(e) => setHomeInfo({ ...homeInfo, imageUrl: e.target.value })}
            className="w-full p-3 border rounded-lg"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            value={homeInfo.name}
            onChange={(e) => setHomeInfo({ ...homeInfo, name: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Job Title</label>
          <input
            type="text"
            value={homeInfo.jobTitle}
            onChange={(e) => setHomeInfo({ ...homeInfo, jobTitle: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            value={homeInfo.description}
            onChange={(e) => setHomeInfo({ ...homeInfo, description: e.target.value })}
            className="w-full p-3 border rounded-lg h-32"
          />
        </div>

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold">
          Save Home Info
        </button>
      </form>
    </div>
  );
}
