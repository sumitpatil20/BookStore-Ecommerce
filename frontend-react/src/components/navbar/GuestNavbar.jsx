import {
    Navbar,
    Nav,
    Container,
    Button
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

function GuestNavbar(){

    return(

        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
        >

            <Container fluid className="px-4">

                <Navbar.Brand>
                    BookStore
                </Navbar.Brand>

                <Navbar.Toggle/>

                <Navbar.Collapse>

                    <Nav className="me-auto">

                        <LinkContainer to="/">
                            <Nav.Link>
                                Home
                            </Nav.Link>
                        </LinkContainer>

                    </Nav>

                    <Nav>

                        <LinkContainer to="/signin">

                            <Nav.Link>
                                SignIn
                            </Nav.Link>

                        </LinkContainer>

                        <LinkContainer to="/signup">

                            <Nav.Link>
                                SignUp
                            </Nav.Link>

                        </LinkContainer>

                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar>
    )
}

export default GuestNavbar;