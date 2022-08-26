import React from "react";

const Create = ({
  createNewUser,
  setName,
  setUsername,
  setJob,
  job,
  username,
  name,
}) => {
  return (
    <section className="form-container">
      <form className="form" action="/localhost:3001/createuser">
        <h3>Add User</h3>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="job">Job:</label>
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="submit-btn" type="submit" onClick={createNewUser}>
          Add
        </button>
      </form>
    </section>
  );
};

export default Create;
