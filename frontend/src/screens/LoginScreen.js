import { useState, useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/loginSlice";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer from react-toastify

import "react-toastify/dist/ReactToastify.css"; // Add this for the ToastContainer styling

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate =useNavigate();

  const [login, { isLoading }] = useLoginMutation(); // Destructure the login function
  const { userInfo } = useSelector((state) => state.login);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" className="my-3">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" variant="primary" className="my-3" disabled={isLoading}>
          Sign In
        </Button>
        {isLoading && <Loader/>}
      </Form>
      <Row>
        <Col>
          New Customer?{''} <Link to={redirect? `/register?redicrect=${redirect}`: '/redirect'}>Register</Link>
        </Col>
      </Row>
      <ToastContainer /> {/* Render the ToastContainer */}
    </FormContainer>
  );
};

export default LoginScreen;
