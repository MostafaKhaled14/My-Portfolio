import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function AboutManager() {
  // ========== Personal Info + Stats ==========
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "mostafa",
    lastName: "khaled",
    age: "27 years old",
    freelance: "available",
    phone: "+201159373701",
    nationality: "Egypt",
    language: "arabic, english",
    email: "mostafa2061999z13@gmail.com",
    address: "Egypt, Giza, October Gardens",
    yearsOfExperience: "1+",
    completedProjects: "8+",
    happyCustomers: "0+",
    awardsWon: "0+",
  });

  // ========== Skills ==========
  const [skills, setSkills] = useState([]);
  const [skillForm, setSkillForm] = useState({ label: "", percentage: 50 });
  const [editSkillId, setEditSkillId] = useState(null);
  const [showSkillForm, setShowSkillForm] = useState(false);

  // ========== Experiences ==========
  const [experiences, setExperiences] = useState([]);
  const [showExpForm, setShowExpForm] = useState(false);
  const [editExpId, setEditExpId] = useState(null);
  const [expForm, setExpForm] = useState({
    date: "",
    position: "",
    description: "",
    order: 1,
  });

  useEffect(() => {
    fetchPersonalInfo();
    fetchSkills();
    fetchExperiences();
  }, []);

  // ----- Personal Info -----
  const fetchPersonalInfo = async () => {
    try {
      const docRef = doc(db, "about", "personal");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPersonalInfo((prev) => ({
          ...prev,
          ...docSnap.data(),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePersonalInfo = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "about", "personal"), personalInfo);
      alert("Personal info & stats saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving");
    }
  };

  // ----- Skills -----
  const fetchSkills = async () => {
    try {
      const q = query(collection(db, "skills"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSkills(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editSkillId) {
        await updateDoc(doc(db, "skills", editSkillId), {
          label: skillForm.label,
          percentage: Number(skillForm.percentage),
        });
      } else {
        await addDoc(collection(db, "skills"), {
          label: skillForm.label,
          percentage: Number(skillForm.percentage),
          order: skills.length + 1,
        });
      }
      setSkillForm({ label: "", percentage: 50 });
      setEditSkillId(null);
      setShowSkillForm(false);
      fetchSkills();
    } catch (err) {
      console.error(err);
      alert("Error saving skill");
    }
  };

  const handleEditSkill = (skill) => {
    setSkillForm({
      label: skill.label || "",
      percentage: skill.percentage || 50,
    });
    setEditSkillId(skill.id);
    setShowSkillForm(true);
  };

  const handleDeleteSkill = async (id) => {
    if (window.confirm("Delete this skill?")) {
      await deleteDoc(doc(db, "skills", id));
      fetchSkills();
    }
  };

  // ----- Experiences -----
  const fetchExperiences = async () => {
    try {
      const q = query(collection(db, "experiences"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExperiences(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExpSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editExpId) {
        await updateDoc(doc(db, "experiences", editExpId), {
          ...expForm,
          order: Number(expForm.order),
        });
      } else {
        await addDoc(collection(db, "experiences"), {
          ...expForm,
          order: Number(expForm.order),
        });
      }
      setExpForm({ date: "", position: "", description: "", order: 1 });
      setEditExpId(null);
      setShowExpForm(false);
      fetchExperiences();
    } catch (err) {
      console.error(err);
      alert("Error saving experience");
    }
  };

  const handleEditExp = (exp) => {
    setExpForm({
      date: exp.date || "",
      position: exp.position || "",
      description: exp.description || "",
      order: exp.order || 1,
    });
    setEditExpId(exp.id);
    setShowExpForm(true);
  };

  const handleDeleteExp = async (id) => {
    if (window.confirm("Delete this experience?")) {
      await deleteDoc(doc(db, "experiences", id));
      fetchExperiences();
    }
  };

  return (
    <div className="space-y-12">
      {/* ========== 1. Personal Info + Stats ========== */}
      <div>
        <h2 className="text-2xl font-bold text-gold mb-4">Personal Info & Stats</h2>
        <form onSubmit={handleSavePersonalInfo} className="bg-white dark:bg-pale p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(personalInfo).map((key) => (
            <div key={key}>
              <label className="block text-sm font-semibold mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                value={personalInfo[key]}
                onChange={(e) => setPersonalInfo({ ...personalInfo, [key]: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold">
              Save Personal Info & Stats
            </button>
          </div>
        </form>
      </div>

      {/* ========== 2. Skills ========== */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gold">My Skills</h2>
          <button
            onClick={() => {
              setShowSkillForm(true);
              setEditSkillId(null);
              setSkillForm({ label: "", percentage: 50 });
            }}
            className="bg-gold text-white px-4 py-2 rounded-lg font-bold"
          >
            + Add Skill
          </button>
        </div>

        {showSkillForm && (
          <form onSubmit={handleSkillSubmit} className="bg-white dark:bg-pale p-6 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm mb-1">Skill Name</label>
              <input
                type="text"
                placeholder="e.g. React"
                value={skillForm.label}
                onChange={(e) => setSkillForm({ ...skillForm, label: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div className="w-32">
              <label className="block text-sm mb-1">Percentage</label>
              <input
                type="number"
                min="0"
                max="100"
                value={skillForm.percentage}
                onChange={(e) => setSkillForm({ ...skillForm, percentage: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg">
              {editSkillId ? "Update" : "Add"}
            </button>
            <button type="button" onClick={() => setShowSkillForm(false)} className="bg-gray-400 text-white px-6 py-3 rounded-lg">
              Cancel
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-white dark:bg-pale p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <span className="font-bold uppercase">{skill.label}</span>
                <span className="text-gold ml-3">{skill.percentage}%</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditSkill(skill)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                  Edit
                </button>
                <button onClick={() => handleDeleteSkill(skill.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== 3. Experiences ========== */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gold">Experiences</h2>
          <button
            onClick={() => {
              setShowExpForm(true);
              setEditExpId(null);
              setExpForm({
                date: "",
                position: "",
                description: "",
                order: experiences.length + 1,
              });
            }}
            className="bg-gold text-white px-4 py-2 rounded-lg font-bold"
          >
            + Add Experience
          </button>
        </div>

        {showExpForm && (
          <form onSubmit={handleExpSubmit} className="bg-white dark:bg-pale p-6 rounded-xl shadow mb-6 space-y-4">
            <input
              type="text"
              placeholder="Date (e.g. Apr 2025 - Present)"
              value={expForm.date}
              onChange={(e) => setExpForm({ ...expForm, date: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Position"
              value={expForm.position}
              onChange={(e) => setExpForm({ ...expForm, position: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
            <textarea
              placeholder="Description"
              value={expForm.description}
              onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
              className="w-full p-3 border rounded-lg h-24"
              required
            />
            <input
              type="number"
              placeholder="Order"
              value={expForm.order}
              onChange={(e) => setExpForm({ ...expForm, order: e.target.value })}
              className="w-full p-3 border rounded-lg"
            />
            <div className="flex gap-4">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">
                {editExpId ? "Update" : "Add"}
              </button>
              <button type="button" onClick={() => setShowExpForm(false)} className="bg-gray-400 text-white px-6 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {experiences.length === 0 ? (
            <p className="text-center py-6">No experiences yet</p>
          ) : (
            experiences.map((exp) => (
              <div key={exp.id} className="bg-white dark:bg-pale p-5 rounded-xl shadow flex justify-between items-start">
                <div>
                  <p className="text-gold font-semibold">{exp.date}</p>
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{exp.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditExp(exp)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteExp(exp.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
