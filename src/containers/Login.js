import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

const getToken = require('@highpoint/get-ps-token');

export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return user.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // use getToken to login to PS to obtain a PS_TOKEN
    // keep track of the returned cookie jar for subsequent requests to PS APIs
    try {
        const jar = await getToken({
        PS_HOSTNAME: 'inlets.rover01.coltonfischer.com',
        PS_ENVIRONMENT: 'ps',
        PS_USERNAME: user,
        PS_PASSWORD: password
        });
        alert("logged In");
        console.log(jar);
    } catch(e){
        alert(e.message);
    }

  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="user" bsSize="large">
          <ControlLabel>User</ControlLabel>
          <FormControl
            autoFocus
            value={user}
            onChange={e => setUser(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}