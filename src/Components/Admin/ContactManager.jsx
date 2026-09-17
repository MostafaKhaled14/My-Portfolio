import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ContactManager() {
  const [contactInfo, setContactInfo] = useState({
    title: "don't be shy !",
    description:
      "Feel free to get in touch with me. i am always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
    address: "Egypt, Giza, October Gardens, Ebny Betak 2, Nile Delta Buildings",
    email: "mostafa2061999z13@gmail.com",
    phone: "+201159373701",
    facebook: "https://www.facebook.com/mstfy.khald.952685/",
    github: "https://github.com/MostafaKhaled14",
    linkedin: "https://www.linkedin.com/in/mostafa-khaled-7481a8285/",
    instagram: "https://www.instagram.com/mostafa_141120/",
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const docRef = doc(db, "contactInfo", "main");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContactInfo((prev) => ({ ...prev, ...docSnap.data() }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "contactInfo", "main"), contactInfo);
      alert("Contact info saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-4">Contact Info</h2>
      <form onSubmit={handleSave} className="bg-white dark:bg-pale p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            value={contactInfo.title}
            onChange={(e) => setContactInfo({ ...contactInfo, title: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            value={contactInfo.description}
            onChange={(e) => setContactInfo({ ...contactInfo, description: e.target.value })}
            className="w-full p-3 border rounded-lg h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Address</label>
          <input
            type="text"
            value={contactInfo.address}
            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Phone</label>
          <input
            type="text"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <hr className="my-4" />
        <h3 className="font-bold text-lg">Social Links</h3>

        <div>
          <label className="block text-sm font-semibold mb-1">Facebook</label>
          <input
            type="url"
            value={contactInfo.facebook}
            onChange={(e) => setContactInfo({ ...contactInfo, facebook: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">GitHub</label>
          <input
            type="url"
            value={contactInfo.github}
            onChange={(e) => setContactInfo({ ...contactInfo, github: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">LinkedIn</label>
          <input
            type="url"
            value={contactInfo.linkedin}
            onChange={(e) => setContactInfo({ ...contactInfo, linkedin: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Instagram</label>
          <input
            type="url"
            value={contactInfo.instagram}
            onChange={(e) => setContactInfo({ ...contactInfo, instagram: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold">
          Save Contact Info
        </button>
      </form>
    </div>
  );
}
