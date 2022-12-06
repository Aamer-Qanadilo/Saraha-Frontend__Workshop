import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../UserContext/UserProvider";
import styles from './styles.module.css';

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
        email:key.email

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
            email:key.email
          });
        }
      });
    } else {
      users.map((key) => {
        r.push({
          name: key.userName,
          id: key._id,
          email: key.email
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
  
    <div className="container  my-5">
      {showMessage && (
        <h4 className={styles.headerText}>
          Find people you want to Send to
        </h4>
      )}
      <div className="d-flex justify-content-center row mt-3">
        <input
          onChange={list}
          className=" form-control mt-3 me-2 w-50"
          type="search"
          placeholder="Search...."
          aria-label="Search"
        />

        <div className="list-group w-75 mt-3">
          <table className="table ">
            <thead>
              <tr className={styles.listColor1}>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>

              {result.map((r,index) => {
                return (
                  <tr className={styles.listColor}>
                    <th scope="row">{index}</th>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td><button type="button" onClick = {() => goToUser(r.id)} class="btn btn-outline-info">Send Email</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  );
}

