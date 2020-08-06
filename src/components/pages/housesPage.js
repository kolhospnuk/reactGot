
import React, {Component} from 'react';
import "./pages.css";
import ItemList from "../itemList/itemList";
import PageDetails, {Field} from "../pageDetails/pageDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock/rowBlock";

export default class HousesPage extends Component {

    gotService = new gotService();

    state = {
        selectedHouse: 1,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem = {({name}) => `${name}`}
                />
        )

        const houseDetails = (
            <PageDetails
                charId={this.state.selectedHouse}
                getData={this.gotService.getHouse}>
                    <Field field='name' label='Name'/>
                    <Field field='region' label='Region'/>
                    <Field field='words' label='Words'/>
                    <Field field='titles' label='Titles'/>
                    <Field field='overload' label='Overload'/>
                    <Field field='ancestralWeapons' label='AncestralWeapons'/>
            </PageDetails>
        )

        return (
            <RowBlock leftRow={itemList} rightRow={houseDetails}/>
        )
    }
}