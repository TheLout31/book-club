import { IconButton } from "@mui/material";
import Chip from "@mui/material/Chip";
import React, { useState } from "react";
import { db } from "../firebase/config";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { doc, updateDoc } from "firebase/firestore";

const DiscussionCard = ({ data, id }) => {
  const [upVote, setUpVote] = useState(data?.upVotes || 0);
  const [upVoted, setUpVoted] = useState(data?.upVoted || false);
  const [downVote, setDownVotes] = useState(data?.downVotes || 0);
  const [downVoted, setDownVoted] = useState(data?.downVoted || false);


  console.log(data.timestamp)

  async function updateDocument(documentId, newData) {
    const docRef = doc(db, "discussions", documentId);
    try {
      await updateDoc(docRef, newData);
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  const handleUpVotes = () => {
    let newUpVote = upVote;
    let newDownVote = downVote;
    let newUpVoted = upVoted;
    let newDownVoted = downVoted;

    if (downVoted) {
      newDownVote -= 1;
      setDownVotes(newDownVote);
      setDownVoted(false);
      newDownVoted = false;
    }

    if (upVoted) {
      newUpVote -= 1;
      setUpVote(newUpVote);
      setUpVoted(false);
      newUpVoted = false;
    } else {
      newUpVote += 1;
      setUpVote(newUpVote);
      setUpVoted(true);
      newUpVoted = true;
    }

    updateDocument(id, {
      upVotes: newUpVote,
      downVotes: newDownVote,
      upVoted: newUpVoted,
      downVoted: newDownVoted,
    });
  };

  const handleDownVotes = () => {
    let newUpVote = upVote;
    let newDownVote = downVote;
    let newUpVoted = upVoted;
    let newDownVoted = downVoted;

    if (upVoted) {
      newUpVote -= 1;
      setUpVote(newUpVote);
      setUpVoted(false);
      newUpVoted = false;
    }

    if (downVoted) {
      newDownVote -= 1;
      setDownVotes(newDownVote);
      setDownVoted(false);
      newDownVoted = false;
    } else {
      newDownVote += 1;
      setDownVotes(newDownVote);
      setDownVoted(true);
      newDownVoted = true;
    }

    updateDocument(id, {
      upVotes: newUpVote,
      upVoted: newUpVoted,
      downVotes: newDownVote,
      downVoted: newDownVoted,
    });
  };

  return (
    <div
      key={id}
      className="flex flex-row bg-white p-5 rounded shadow align-middle justify-between"
    >
      <div>
        <h3 className="text-lg font-bold text-indigo-700">{data.name}</h3>
        <p className="text-gray-700 mt-2">{data.message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {data.timestamp?.toDate
            ? new Date(data.timestamp.toDate()).toLocaleString()
            : "Just now"}
        </p>
      </div>
      <div className="flex align-middle">
        <IconButton onClick={handleUpVotes}>
          <Chip
            icon={
              <ArrowDropUpIcon
                fontSize="large"
                style={{ color: upVoted ? "green" : "grey" }}
              />
            }
            label={upVote}
          />
        </IconButton>
        <IconButton onClick={handleDownVotes}>
          <Chip
            icon={
              <ArrowDropDownIcon
                fontSize="large"
                style={{ color: downVoted ? "red" : "grey" }}
              />
            }
            label={downVote}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default DiscussionCard;
