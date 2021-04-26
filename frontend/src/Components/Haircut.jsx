import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Haircut = ({ haircut }) => {
    return (
        <Card id='haircutCard'>
            <Card.Body>
                <Link class='link' to={`/haircuts/${haircut._id}`}><Card.Title>{haircut.name}</Card.Title>
                    <Card.Img className="py-3" src={haircut.imageUrl} variant="top"></Card.Img>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Haircut