
import React, {Component} from 'react';
import gotService from "../../services/gotService";
import PageDetails, {Field} from "../pageDetails/pageDetails";

export default class BooksItem extends Component {
    gotService = new gotService();

    render() {
        return (
            <PageDetails
                itemId={this.props.bookId}
                getData={this.gotService.getBook}>
                <Field field='name' label='Name'/>
                <Field field='numberOfPages' label='NumberOfPages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </PageDetails>
        )
    }
}