// Admin User List Page
import {
    Container,
    Alert,
    Table
} from "react-bootstrap";

import { useEffect , useState } from "react";

import { fetchUsers } from "./adminService";

import { toast } from "react-toastify";

function UserList(){

    const [users , setUsers] = useState([]);

    // fetch users
    const getUsers = async()=>{

        try{

            const response = await fetchUsers();

            setUsers(response.data);

        }
        catch(error){

            toast.error("Error fetching users");
        }
    }

    useEffect(()=>{

        getUsers();

    },[]);

    return(

        <Container className="mt-4">

            <Alert variant="dark">
                <h3>All Users</h3>
            </Alert>

            <Table
                striped
                bordered
                hover
                responsive
            >

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Order History</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        users.map((user)=>{

                            return(

                                <tr key={user.user_id}>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>

                                        {
                                            user.total_orders || 0
                                        }

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

export default UserList;