
import React, {Component} from 'react';
import "./pages.css";
import ItemList from "../itemList/itemList";
import PageDetails, {Field} from "../pageDetails/pageDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock/rowBlock";

export default class CharacterPage extends Component {

    gotService = new gotService();

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    onValueChange = (e) => {
        this.setState({
            pageNum: e.target.value
        })
    }

    render() {

        const {selectedChar, pageNum} = this.props;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const pageForm = (
            <form>
                <input
                    type="text"
                    placeholder="List char"
                    onChange={this.onValueChange}
                    value={pageNum}
                />
                <button className="add-char" type="submit">Add Char</button>
            </form>
        )

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem = {({name, gender}) => `${name}(${gender})`}
                pageNum={pageNum}/>
        )

        const pageDetails = (
            <PageDetails charId={selectedChar}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </PageDetails>
        )

        return (
            <RowBlock form={pageForm} leftRow={itemList} rightRow={pageDetails}/>
        )
    }
}