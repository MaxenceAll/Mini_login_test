import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../Contexts/AuthContext";
import fetcher from "../Helpers/fetcher";



function AdminDashboard() {
  const { isLoggedIn, userEmail, token, userRole, isLoading } = useContext(AuthContext);
  const [response, setResponse] = useState("");

  const handleButtonClick = async (method, route) => {
    try {
      const apiResponse = await fetcher[method](`/api/v1/${route}`, {}, { Authorization: `Bearer ${token}` });
      setResponse(JSON.stringify(apiResponse, null, 2));
    } catch (error) {
      console.error("Error while sending API request:", error);
      setResponse("Error occurred during API request.");
    }
  };

  if (isLoading) {  
    return <p>Chargement...</p>;
  }

  return (
    <Container>
      <Title>Admin Dashboard</Title>
      <InfoContainer>
        <Label>isLoggedIn:</Label>
        <p>{isLoggedIn.toString()}</p>
      </InfoContainer>
      <InfoContainer>
        <Label>userEmail:</Label>
        <p>{userEmail}</p>
      </InfoContainer>
      <InfoContainer>
        <Label>token:</Label>
        <p>{token}</p>
      </InfoContainer>
      <InfoContainer>
        <Label>userRole:</Label>
        <p>{userRole}</p>
      </InfoContainer>

      <ButtonContainer>
        <button onClick={() => handleButtonClick("get", "manager")}>GET Request to a manager route</button>
        <button onClick={() => handleButtonClick("post", "manager")}>POST Request to a manager route</button>
        <button onClick={() => handleButtonClick("put", "manager")}>PUT Request to a manager route</button>
        <button onClick={() => handleButtonClick("delete", "manager")}>DELETE Request to a manager route</button>
      </ButtonContainer>
      <ButtonContainer>
        <button onClick={() => handleButtonClick("get", "user")}>GET Request to an user route</button>
        <button onClick={() => handleButtonClick("post", "user")}>POST Request to an user route</button>
        <button onClick={() => handleButtonClick("put", "user")}>PUT Request to an user route</button>
        <button onClick={() => handleButtonClick("delete", "user")}>DELETE Request to an user route</button>
      </ButtonContainer>
      <ButtonContainer>
        <button onClick={() => handleButtonClick("get", "admin")}>GET Request to an admin route</button>
        <button onClick={() => handleButtonClick("post", "admin")}>POST Request to an admin route</button>
        <button onClick={() => handleButtonClick("put", "admin")}>PUT Request to an admin route</button>
        <button onClick={() => handleButtonClick("delete", "admin")}>DELETE Request to an admin route</button>
      </ButtonContainer>

      <ResponseContainer>
        <ResponseTitle>API Response:</ResponseTitle>
        <ResponseText>{response}</ResponseText>
      </ResponseContainer>
    </Container>
  );
}

export default AdminDashboard;


const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.p`
  font-weight: bold;
`;

const ResponseContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
`;

const ResponseTitle = styled.h2`
  margin-bottom: 10px;
`;

const ResponseText = styled.pre`
  white-space: pre-wrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  button {
    margin-right: 10px;
  }
`;