import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState(""); //can be email too
  const [password, setPassword] = useState("");

  const login = () => {
    //stuff to do when the post is to be uploaded
    const userData = {
      username,
      password,
    };
  };


  return (
    <>
      <div className="inputFields">
        <div className="firstRowInputs">
        <p>Username</p>
        <input
            type="text"
            placeholder="Enter username or email"
            value={username}
            onChange={(event) => {
                setUsername(event.target.value);
            }}
          />
        </div>

        <div className="secondRowInputs">
        <p>Password</p>
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <button id="Sign In" onClick={login}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
