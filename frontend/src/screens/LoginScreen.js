import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import FormContainer from "../components/FormContainer.js";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email" className="my-3">
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter Email"
            value={email} // Use curly braces for variables, not single quotes
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" className="my-3">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter Password"
            value={password} // Use curly braces for variables, not single quotes
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" variant="primary" className="my-3">
          Sign In
        </Button>
      </Form>
        <Row>
            <Col>
                New Customer? <Link to='/register'>Register</Link>
            </Col>
        </Row>

    </FormContainer>
  );
};

export default LoginScreen;
