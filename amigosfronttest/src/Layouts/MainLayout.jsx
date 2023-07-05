import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <DIV_AppContainer>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <FOOTER_Container>
        <Footer />
      </FOOTER_Container>
    </DIV_AppContainer>
  );
}

const DIV_AppContainer = styled.div`
  min-width: 100dvw;
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  background-size: contain;
  background-color: gray;

  header {
    position: sticky;
      top: 0;
      z-index: 999;  
  }
`;


const FOOTER_Container = styled.footer`
  margin-top: auto;
`;
