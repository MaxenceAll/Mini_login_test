import React, { useContext } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import fetcher from '../Helpers/fetcher';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';


const Login = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const resp = await fetcher.post('/api/v1/auth/login', values); // Replace with your login API endpoint
                console.log(resp)
                if (resp.token){
                  login(resp.token, resp.role, resp.email);
                  localStorage.setItem('token', resp.token);                
                  navigate('/');
                } else {                
                  setErrors({ register: 'Registration failed' });
                }
            } catch (error) {
                setErrors({ login: 'Invalid email or password' });
            }
            setSubmitting(false);
        },
    });

    return (
        <Container>
            <FormContainer>
                <Title>Login</Title>
                <Form onSubmit={formik.handleSubmit}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        autoComplete='on'
                    />

                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        autoComplete='on'
                    />

                    {formik.errors.login && (
                        <ErrorMessage>{formik.errors.login}</ErrorMessage>
                    )}

                    <Button type="submit" disabled={formik.isSubmitting}>
                        Login
                    </Button>
                </Form>
            </FormContainer>
        </Container>
    );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  background-color: antiquewhite;
  padding: 20px;
  border-radius: 5px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;
