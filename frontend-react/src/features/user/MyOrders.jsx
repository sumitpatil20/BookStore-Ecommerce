// Orders + Cancel Order
import {
    Container,
    Alert,
    Table,
    Button
} from "react-bootstrap";

import {
    fetchMyOrders,
    cancelOrder
} from "./userService";

import { useEffect , useState } from "react";

import { toast } from "react-toastify";

function MyOrders(){

    const [orders , setOrders] = useState([]);

    // fetch orders
    const getOrders = async()=>{

        try{

            const response = await fetchMyOrders();

            setOrders(response.data);

        }
        catch(error){

            toast.error("Error fetching orders");
        }
    }

    useEffect(()=>{

        getOrders();

    },[]);

    // cancel order
    const cancelMyOrder = async(id)=>{

        const confirm = window.confirm(
            "Are you sure you want to cancel order ?"
        );

        if(!confirm){

            return;
        }

        try{

            await cancelOrder(id);

            toast.success("Order Cancelled");

            getOrders();

        }
        catch(error){

            toast.error("Cancel Failed");
        }
    }

    return(

        <Container className="mt-4">

            <Alert variant="dark">
                <h3>My Orders</h3>
            </Alert>

            <Table
                striped
                bordered
                hover
                responsive
            >

                <thead>

                    <tr>
                        <th>Order Id</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        orders.map((order)=>{

                            return(

                                <tr key={order.order_id}>

                                    <td>{order.order_id}</td>

                                    <td>₹{order.total_amount}</td>

                                    <td>
                                        {order.payment_status}
                                    </td>

                                    <td>

                                        <Button
                                            variant="danger"
                                            size="sm"

                                            onClick={()=>
                                                cancelMyOrder(order.order_id)
                                            }
                                        >
                                            Cancel
                                        </Button>

                                    </td>

                                </tr>
                            )
                        })
                    }

                </tbody>

            </Table>

        </Container>
    )
}

export default MyOrders;