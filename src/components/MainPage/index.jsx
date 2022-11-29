import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../UserContext/UserProvider";

export default function MainPage({ showMessage = false }) {
  let navigat = useNavigate();
  const { users } = useContext(UserContext);

  let [result, setResult] = useState([]);

  useEffect(() => {
    let r = [];
    users.map((key) => {
      r.push({
        name: key.userName,
        id: key._id,
      });
    });
    setResult(r);
  }, [users]);

  function list(e) {
    let r = [];
    let s = e.target.value;
    if (s != "") {
      users.map((key) => {
        if (key.userName?.toLowerCase().startsWith(s.toLowerCase())) {
          r.push({
            name: key.userName,
            id: key._id,
          });
        }
      });
    } else {
      users.map((key) => {
        r.push({
          name: key.userName,
          id: key._id,
        });
      });
    }

    setResult(r);
  }

  function goToUser(id) {
    navigat({
      pathname: `/messageUser/${id}`,
    });
  }

  return (
    <div className="container text-center my-5">
      {showMessage && (
        <h4>
          Sarahah allows you to receive constructive feedback from your friends
          and co-workers
          <br />
          <br />
          <br />
          Find the people you want to Send to
        </h4>
      )}
      <div className="d-flex justify-content-center row">
        <input
          onChange={list}
          className=" form-control me-2 w-75"
          type="search"
          placeholder="Search...."
          aria-label="Search"
        />

        <div class="list-group w-75 mt-3">
          {result.map((r) => {
            return (
              <p
                onClick={() => goToUser(r.id)}
                className="list-group-item list-group-item-action"
              >
                {r.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
