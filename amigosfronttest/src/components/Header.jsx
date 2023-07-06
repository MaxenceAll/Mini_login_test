import { styled } from "styled-components";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from "react-router-dom";


function Header() {

    return (
        <DIV_Header_Container>
            <NavLink to="/">
                No log required
            </NavLink>
            <NavLink to="/login">
                Login
            </NavLink>
            <NavLink to="/register">
                Register
            </NavLink>
            <NavLink to="/user">
                Logged Only
            </NavLink>
            <NavLink to="/manager">
                Logged & Manager Only
            </NavLink>
            <NavLink to="/admin">
                Logged & Admin Only
            </NavLink>
        </DIV_Header_Container>
    )
}

export default Header

const DIV_Header_Container = styled.div`
    padding-left: 15%;
    padding-right: 15%;
    background-color: orange;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 65px;
    gap: 5%;
    font-size: 1.5rem;
    .active-link {
    /* text-decoration: underline; */
    background-color: yellow;
    color: red;
    border-radius: 4px;
    border: 2px solid gray;
    }
`;