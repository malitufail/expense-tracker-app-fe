import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';

const Container = styled.div`
  text-align: center;
  border: 1px solid #000;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 25px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  outline: none;
  border-radius: 5px;
  margin: 5px 0;
  border: 1px solid #000;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  outline: none;
  border-radius: 5px;
  margin: 5px 0;
  border: 1px solid #000;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  margin-left: 10px;
  cursor: pointer;
`;

const RadioBtn = styled(RadioContainer)`
  margin: 10px 20px 10px 0;
`;

const SubmitBtn = styled.button`
cursor: pointer;
background-color: rgba(255, 255, 255, 0.3);
color: rgb(255, 255, 255);
padding: 7px 20px;
font-size: 16px;
border: none;
text-transform: uppercase;
border-radius: 5px;
  &:hover {
    background-color: #000;
  }
`;

const LoginUser = ({ setTrackerToggle,setLoginToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SubmitLoginUser = () => {
    axios.post('http://localhost:8000/api/users/login', {
      email: email,
      password: password,
    })
      .then(function (response) {
        console.log(response.data.data.length)
        if(response.data.data.length > 0){
          localStorage.userId = response.data.data[0].id
          setTrackerToggle(true);
        } else {
          alert("error login")
        }
        
      })
      .catch(function (error) {
        alert(error);
      });


  };

  return (
    <Container>
      <h4>Login User</h4>
      <Input
        type={"text"}
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type={"password"}
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SubmitBtn onClick={SubmitLoginUser}>Login</SubmitBtn>
      <RadioContainer>
        <RadioBtn>
          <input
            type="radio"
            id="login"
            name="type"
            value={"login"}
            checked={true}
            onChange={(e) => setLoginToggle(true)}
          />
          <Label htmlFor="login">Login</Label>
        </RadioBtn>

        <RadioBtn>
          <input
            type="radio"
            id="register"
            name="type"
            value={"register"}
            checked={false}
            onChange={(e) => setLoginToggle(false)}
          />
          <Label htmlFor="register">Register</Label>
        </RadioBtn>
      </RadioContainer>
    </Container>
  );
};

export default LoginUser;
