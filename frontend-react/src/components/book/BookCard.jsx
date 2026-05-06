// Reusable book card
import {
    Card,
    Button
} from "react-bootstrap";

import './book.css';

function BookCard({book,onAddToCart}){

    return(

        <Card className="book-card shadow-sm">

            <Card.Body>

                <Card.Title>
                    {book.title}
                </Card.Title>

                <Card.Subtitle className="mb-2 text-muted">

                    {book.author}

                </Card.Subtitle>

                <Card.Text>

                    {book.description || "No Description"}

                </Card.Text>

                <h5 className="text-success">
                    ₹{book.price}
                </h5>

                <Button
                    variant="dark"
                    className="w-100"

                    onClick={()=>
                        onAddToCart(book.book_id)
                    }
                >
                    Add To Cart
                </Button>

            </Card.Body>

        </Card>
    )
}

export default BookCard;