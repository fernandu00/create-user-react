import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:3001/getusers");
    setUsers(response.data);
  };

  const createNewUser = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/createuser", {
      name,
      job,
      username,
    });

    // const { newName, newJob, newUsername } = response.data;
    alert(`user ${name} created \n  job: ${job} \n username:${username}`);
    setName("");
    setJob("");
    setUsername("");
    getUsers();
  };

  const deleteUser = async (_id) => {
    const response = await axios.delete(`http://localhost:3001/users/${_id}`);
    console.log(response.data);
    getUsers();
  };

  const editUser = async (_id) => {
    const editingUser = await users.find((item) => item._id === _id);
    const { name, job, username } = editingUser;

    setIsEditing(true);
    setName(name);
    setJob(job);
    setUsername(username);
    setEditID(_id);
  };

  const handleUpdate = async (editID) => {
    const response = await axios.patch(
      `http://localhost:3001/users/${editID}`,
      {
        name,
        job,
        username,
      }
    );
    setName("");
    setJob("");
    setUsername("");
    setIsEditing(false);
    getUsers();
  };

  return (
    <div className="App">
      {isEditing ? (
        <Edit
          name={name}
          setName={setName}
          job={job}
          setJob={setJob}
          username={username}
          setUsername={setUsername}
          createNewUser={createNewUser}
          editID={editID}
          setEditID={setEditID}
          setIsEditing={setIsEditing}
          editUser={editUser}
          handleUpdate={handleUpdate}
        />
      ) : (
        <Create
          name={name}
          setName={setName}
          job={job}
          setJob={setJob}
          username={username}
          setUsername={setUsername}
          createNewUser={createNewUser}
        />
      )}
      <article>
        <button className="submit-btn" onClick={getUsers}>
          List users
        </button>
      </article>
      {users.length > 0 && <h1>Users</h1>}
      <section className="user-container">
        {users.map((user) => {
          const { _id, name, job, username } = user;
          return (
            <article className="users" key={_id}>
              <h2 className="name">Name: {name} </h2>
              <h3 className="job">Job: {job}</h3>
              <p className="username">Username: {username}</p>
              <div className="icon-container">
                <button className="icon" onClick={() => editUser(_id)}>
                  <AiFillEdit className="edit" />
                </button>
                <button className="icon" onClick={() => deleteUser(_id)}>
                  <FaTrash className="delete" />
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default App;
