import {
    Navbar,
    Nav,
    Container,
    Button
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import { useNavigate } from "react-router-dom";

function UserNavbar(){

    const navigate = useNavigate();

    // logout
    const logout = ()=>{

        const confirm = window.confirm(
            "Are you sure you want to logout ?"
        );

        if(confirm){

            localStorage.clear();

            navigate("/signin");
        }
    }

    return(

        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            className="shadow-sm"
        >

            <Container fluid className="px-4 mt-4">

                <Navbar.Brand>
                    BookStore
                </Navbar.Brand>

                <Navbar.Toggle/>

                <Navbar.Collapse>

                    <Nav className="me-auto">

                        <LinkContainer to="/user/home">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/user/cart">
                            <Nav.Link>Cart</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/user/orders">
                            <Nav.Link>MyOrders</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/user/profile">
                            <Nav.Link>Profile</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/user/contact">
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>

                    </Nav>

                    <Button
                        variant="outline-light"
                        onClick={logout}
                    >
                        Logout
                    </Button>

                </Navbar.Collapse>

            </Container>

        </Navbar>
    )
}

export default UserNavbar;