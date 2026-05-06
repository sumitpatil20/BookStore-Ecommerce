// Cart page
import {
    Container,
    Alert,
    Row,
    Col,
    Card,
    Button
} from "react-bootstrap";

import {
    fetchCart,
    removeCartItem,
    placeOrder,
    makePayment
} from "./userService";

import { useEffect , useState } from "react";

import { toast } from "react-toastify";

function Cart(){

    const [cartItems , setCartItems] = useState([]);

    // fetch cart
    const getCart = async()=>{

        try{

            const response = await fetchCart();

            setCartItems(response.data);

        }
        catch(error){

            toast.error("Error fetching cart");
        }
    }

    useEffect(()=>{

        getCart();

    },[]);

    // remove item
    const removeItem = async(id)=>{

        try{

            await removeCartItem(id);

            toast.success("Item Removed");

            getCart();

        }
        catch(error){

            toast.error("Remove Failed");
        }
    }

    // payment
    const proceedPayment = async()=>{

        const confirm = window.confirm(
            "Are you sure you want to place order ?"
        );

        if(!confirm){

            return;
        }

        try{

            // place order
            const orderResponse = await placeOrder();

            // payment
            await makePayment({
                order_id : orderResponse.data.orderId
            });

            toast.success("Payment Successful");

            getCart();

        }
        catch(error){

            toast.error("Payment Failed");
        }
    }

    return(

        <Container className="mt-4">

            <Alert variant="dark">
                <h3>Cart</h3>
            </Alert>

            <Row>

                {
                    cartItems.map((item)=>{

                        return(

                            <Col
                                lg={4}
                                md={6}
                                className="mb-4"
                                key={item.cart_item_id}
                            >

                                <Card className="shadow-sm">

                                    <Card.Body>

                                        <Card.Title>
                                            {item.title}
                                        </Card.Title>

                                        <Card.Subtitle className="mb-2 text-muted">

                                            {item.author}

                                        </Card.Subtitle>

                                        <h5 className="text-success">

                                            ₹{item.price}

                                        </h5>

                                        <Button
                                            variant="danger"
                                            className="w-100"

                                            onClick={()=>
                                                removeItem(item.cart_item_id)
                                            }
                                        >
                                            Remove
                                        </Button>

                                    </Card.Body>

                                </Card>

                            </Col>
                        )
                    })
                }

            </Row>

            {/* PAYMENT BUTTON */}
            {
                cartItems.length > 0 &&

                <Button
                    variant="dark"
                    onClick={proceedPayment}
                >
                    Proceed To Payment
                </Button>
            }

        </Container>
    )
}

export default Cart;