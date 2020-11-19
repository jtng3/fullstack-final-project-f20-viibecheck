import React from 'react';
import { Card } from 'react-bootstrap';
import './Card.css';
import Form from './Form.js';

class MainCard extends React.Component {

    render() {
        return(
        <Card id='card'>
            <Card.Body>
                <Card.Title>
                    VibeCheck Form
                </Card.Title>
                <Form />
            </Card.Body>
        </Card>
        )}
}

export default MainCard;