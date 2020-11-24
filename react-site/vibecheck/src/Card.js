import React from 'react';
import { Card, Carousel, CarouselItem } from 'react-bootstrap';
import './Card.css';
import VibeForm from './Form.js';
import Search from './Search';

class MainCard extends React.Component {

    render() {
        return(
        <Carousel interval={null}>
            <CarouselItem>
                <Card id='text-card'>
                    <Card.Body>
                        <Card.Title>
                        VibeCheck
                        </Card.Title>
                        <Card.Text>
                            Vibecheck is our final project. Info about the project will be on this card.
                            <br/><br/>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CarouselItem>
            <CarouselItem>
                <Card id='form-card'>
                    <Card.Body>
                        <Card.Title>
                        VibeCheck Form
                        </Card.Title>
                        <VibeForm />
                    </Card.Body>
                </Card>
            </CarouselItem>
            <CarouselItem>
                <Card id='search-card'>
                    <Card.Body>
                        <Card.Title>
                        VibeCheck Search
                        </Card.Title>
                        <Search />
                    </Card.Body>
                </Card>
            </CarouselItem>
        </Carousel>
        )}
}

export default MainCard;