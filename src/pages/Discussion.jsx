import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { ref, push, onValue, serverTimestamp, off } from "firebase/database";
import Alert from "@mui/material/Alert";
import Toast from "../components/Toast";
const Discussion = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const discussionsRef = ref(db, "discussions");
    const callback = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setDiscussions(parsed);
      }
    };

    onValue(discussionsRef, callback);
    return () => off(discussionsRef, "value", callback); // Correct cleanup
  }, []);
  const handleClose = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !message) {
      setError("Fill the Fields");
      return;
    }

    const discussionsRef = ref(db, "discussions");

    try {
      await push(discussionsRef, {
        name,
        message,
          timestamp: serverTimestamp(),
      });

      setMessage("");
    } catch (err) {
      console.error("Failed to submit discussion:", err);
      setError("Failed to submit discussion. Check your Firebase config.");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-6">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
        Community Discussions
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-xl mx-auto p-6 rounded shadow-md mb-10"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          rows={4}
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-4 p-3 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
        {error && (
          <Toast
            varient="outlined"
            severity="info"
            children={error}
            onClose={() => handleClose()}
          />
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Post Discussion
        </button>
      </form>

      {/* Recent Discussions */}
      <div className="max-w-3xl mx-auto space-y-4">
        {discussions.length === 0 ? (
          <p className="text-center text-indigo-600">No discussions yet.</p>
        ) : (
          discussions.map((d) => (
            <div key={d.id} className="bg-white p-5 rounded shadow">
              <h3 className="text-lg font-bold text-indigo-700">{d.name}</h3>
              <p className="text-gray-700 mt-2">{d.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(d.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Discussion;
