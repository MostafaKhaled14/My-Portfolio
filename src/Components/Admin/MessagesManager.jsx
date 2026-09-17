import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this message?")) {
      await deleteDoc(doc(db, "messages", id));
      fetchMessages();
    }
  };

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p className="text-center text-lg py-10">No messages yet</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="bg-white dark:bg-pale p-5 rounded-xl shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg">{msg.name}</h3>
                <p className="text-sm text-gray-500">{msg.email}</p>
              </div>
              <button onClick={() => handleDelete(msg.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                Delete
              </button>
            </div>
            <p className="font-semibold text-gold mb-2">{msg.subject}</p>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{msg.message}</p>
            {msg.createdAt && <p className="text-xs text-gray-400 mt-3">{msg.createdAt.toDate ? msg.createdAt.toDate().toLocaleString() : ""}</p>}
          </div>
        ))
      )}
    </div>
  );
}
