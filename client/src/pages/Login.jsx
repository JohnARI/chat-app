import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === true) {
        toast.success("Login successful", toastOptions);
        localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
      }

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = values;

    if (username === "") {
      toast.error("Username is required", toastOptions);
      return false;
    }

    if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
            min="3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>

          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
height: 100vh;
display; flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}
img {
  height: 10rem;
  user-drag: none;
}
form {
  display: flex;
  margin: auto;
  flex-direction: column;
  gap: 1rem;
  width: 30%;
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
button {
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #000;
  color: #fff;
  cursor: pointer;
}
span {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

@media screen and (max-width: 768px) {
  form {
    width: 80%;
  }
}

@media screen and (max-width: 480px) {
  form {
    width: 90%;
  }
}

@media screen and (max-width: 320px) {
  form {
    width: 100%;
  }
}
`;
export default Login;
