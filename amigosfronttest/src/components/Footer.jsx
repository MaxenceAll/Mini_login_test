import styled from "styled-components";


function Footer() {
  return (
    <DIV_Footer_Container>
      <div>
        © Testor
      </div>
      <div>
        Tester ©
      </div>
    </DIV_Footer_Container>
  );
}

export default Footer;

const DIV_Footer_Container = styled.div`
  border-top: 2px solid red;
  display: flex;
  justify-content: space-between;
  padding: 1%;
  background-color: orangered;
  color: white;
`;
