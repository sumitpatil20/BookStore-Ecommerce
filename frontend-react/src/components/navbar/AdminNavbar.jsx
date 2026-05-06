// Navbar visible only for Admin
import { Navbar , Nav , Container , Button } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import { useNavigate } from "react-router-dom";

import './navbar.css';

function AdminNavbar(){

    const navigate = useNavigate();

    // logout flow
    const logout = ()=>{

        // confirm before logout
        const confirm = window.confirm(
            "Are you sure you want to logout ?"
        );

        if(confirm){

            // clear browser storage
            localStorage.clear();

            // redirect to signin
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
                    BookStore Admin
                </Navbar.Brand>

                {/* mobile toggle */}
                <Navbar.Toggle/>

                <Navbar.Collapse>

                    <Nav className="me-auto">

                        {/* Admin Home */}
                        <LinkContainer to="/admin/home">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        {/* Users List */}
                        <LinkContainer to="/admin/users">
                            <Nav.Link>User List</Nav.Link>
                        </LinkContainer>

                        {/* Admin Profile */}
                        <LinkContainer to="/admin/profile">
                            <Nav.Link>Profile</Nav.Link>
                        </LinkContainer>

                    </Nav>

                    {/* logout button */}
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

export default AdminNavbar;