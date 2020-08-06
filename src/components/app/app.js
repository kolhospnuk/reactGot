
import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import './app.css';
import Header from "../header/header";
import RandomChar from "../randomChar/randomChar";
import ErrorMessage from "../errorMessage/errorMessage";
import CharacterPage from "../pages/characterPage";
import BooksPage from "../pages/booksPage";
import HousesPage from "../pages/housesPage";
import BooksItem from "../pages/booksItem";
import GotService from "../../services/gotService";
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

    gotService = new GotService();

    state = {
        randomCharBtn: true,
        error: false,
    }

    componentDidCatch() { // жизненный цикл для того что б сделать код синхронным, что б четкий порядок: конструктор, рендер(все построилось), а потом уже жизненые циклы(с запросами к серверам и т.д.)
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                randomCharBtn: !state.randomCharBtn
            }
        })
    }

    render() {

        const char = this.state.randomCharBtn ? <RandomChar interval={15000}/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button
                                    className={`btn-random`}
                                    onClick={this.toggleRandomChar}
                                    >
                                    Random Char
                                </button>
                            </Col>
                        </Row>

                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>}
                            }/>
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
};

