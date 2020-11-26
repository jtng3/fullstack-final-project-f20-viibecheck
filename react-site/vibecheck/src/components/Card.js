import React from 'react';
import { Card, Carousel, CarouselItem, Button, Modal  } from 'react-bootstrap';
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
                            Vibecheck is our final project for CS 465P.
                            <br/>
                            It was created by Michael Jenkins, Nhan Le, and Jaeger Tang.
                            <br/><br/>
                            Consent is an often overlooked issue in our society, and accusations of harrassment and assault all too often go unheard,
                            causing problematic people to continue unopposed. 
                            <br/><br/>
                            Vibecheck was created to play a small role in remedying this. If someone has made you feel unsafe or harmed you in some manner, 
                            their basic information can be submitted to our database.
                            <br/><br/>
                            If you have concerns about an upcoming date or a new roommate, you can use their information to search our database and we'll let you
                            know whether they appear in it and a general idea of how many reports there have been.
                            <br/><br/>
                            If you submit a report, we don't collect or store any information about you, it's fully anonymous for your protection.
                            <br/>
                            As a consequence of this, reports cannot be verified. 
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