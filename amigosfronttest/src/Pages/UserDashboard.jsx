import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../Contexts/AuthContext";
import fetcher from "../Helpers/fetcher";



function UserDashboard() {
  const { isLoggedIn, userEmail, token, userRole, isLoading } = useContext(AuthContext);
  const [response, setResponse] = useState("");

  const handleButtonClick = async (method) => {
    try {
      const apiResponse = await fetcher[method]("/api/v1/user", {}, { Authorization: `Bearer ${token}` });
      setResponse(JSON.stringify(apiResponse, null, 2));
    } catch (error) {
      console.error("Error while sending API request:", error);
      setResponse("Error occurred during API request.");
    }
  };

  if (isLoading) {  
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>User Dashboard</Title>
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
        <button onClick={() => handleButtonClick("get")}>GET Request</button>
        <button onClick={() => handleButtonClick("post")}>POST Request</button>
        <button onClick={() => handleButtonClick("put")}>PUT Request</button>
        <button onClick={() => handleButtonClick("delete")}>DELETE Request</button>
      </ButtonContainer>

      <ResponseContainer>
        <ResponseTitle>API Response:</ResponseTitle>
        <ResponseText>{response}</ResponseText>
      </ResponseContainer>
    </Container>
  );
}

export default UserDashboard;


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