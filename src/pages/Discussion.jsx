import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import Toast from "../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscussions } from "../redux/slice/discussionSlice";
import DiscussionCard from "../components/DiscussionCard";
import { CircularProgress } from "@mui/material";

const Discussion = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [discussions, setDiscussions] = useState([]);
  const [formError, setFormError] = useState("");
  const { data, loading, error } = useSelector((state) => state.discussions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiscussions());
  }, []);

  const handleClose = () => {
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!name || !message) {
      setFormError("Fill the Fields");
      return;
    }

    try {
      await addDoc(collection(db, "discussions"), {
        name,
        message,
        timestamp: serverTimestamp(),
        upVotes: 0,
        downVotes: 0,
        upVoted: false,
        downVoted: false,
      });
      dispatch(fetchDiscussions());
      setMessage("");
      setName("");
    } catch (err) {
      console.error("Failed to submit discussion:", err);
      setFormError("Failed to submit discussion. Check your Firebase config.");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50  p-6">
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
        {formError && (
          <Toast
            varient="outlined"
            severity="info"
            children={formError}
            onClose={handleClose}
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
      {error && <Toast variant="filled" severity="error" children={error} />}
      <div className="max-w-3xl mx-auto space-y-4">
        {loading ? (
          <div className="flex align-middle justify-center h-7">
            <CircularProgress size="3rem" style={{ color: "#432DD7" }} />
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-indigo-600">No discussions yet.</p>
        ) : (
          data.map((d) => <DiscussionCard data={d} id={d.id} />)
        )}
      </div>
    </div>
  );
};

export default Discussion;
