// login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axiosinstance";

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  }

  const onLogin = (event) => {
    event.preventDefault();
    AxiosInstance.post('auth/login/', {
      username,
      password,
    })
      .then((response) => {
        if (response.status === 200) {
          login(true);
          console.log('Login successful');
          navigate('/'); // Redirect to the home page or a protected route
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((error) => {
        setError("Error logging in");
      });
  }

  return (
    <div className="container mt-3">
      <h1>React Cookie Auth</h1>
      <br />
      <h2>Login</h2>
      <form onSubmit={onLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={username} onChange={handleUserNameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={password} onChange={handlePasswordChange} />
          <div>
            {error && 
              <small className="text-danger">
                {error}
              </small>
            }
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
