import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const { email, username, password } = values;

      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/login");
      }

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("Password does not match", toastOptions);
      return false;
    }

    if (username === "") {
      toast.error("Username is required", toastOptions);
      return false;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters", toastOptions);
      return false;
    }

    if (username.length > 16) {
      toast.error("Username cannot be more than 16 characters", toastOptions);
      return false;
    }

    if (username.search(/\s/) !== -1) {
      toast.error("Username cannot contain spaces", toastOptions);
      return false;
    }

    if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", toastOptions);
      return false;
    }

    if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }

    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error("Email is not valid", toastOptions);
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
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Register</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
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
export default Register;
