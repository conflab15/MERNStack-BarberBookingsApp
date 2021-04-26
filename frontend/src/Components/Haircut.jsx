import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Haircut = ({ haircut }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Card.Body>
                <Link to={`/haircuts/${haircut._id}`}><Card.Title>{haircut.name}</Card.Title>
                    <Card.Img className="py-3" src={haircut.imageUrl} variant="top"></Card.Img>
                </Link>
                <Card.Text>
                    <h3 className='py-2'>£{haircut.price}</h3>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Haircut