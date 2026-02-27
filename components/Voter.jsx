import { useState } from "react";

import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";

const Voter = ({ changeVote }) => {
  return (
    <>
      <span>
        <button
          className="thumb-up"
          onClick={() => {
            changeVote(1);
          }}
        >
          <BsFillHandThumbsUpFill />
        </button>
        <button
          className="thumb-down"
          onClick={() => {
            changeVote(-1);
          }}
        >
          <BsFillHandThumbsDownFill />
        </button>
      </span>
    </>
  );
};

export default Voter;
