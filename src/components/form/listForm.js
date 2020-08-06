
import React, {Component} from 'react';
import "./listForm.css";
import characterPage from "../pages/characterPage";

export default class ListForm extends Component {

    state = {
        error: false,
        pageNum: ''
    }

    onValueChange = (e) => {
        this.setState({
            pageNum: e.target.value
        })
    }

    render() {
        const {pageNum} = this.state;

        return (
            <>
                <form>
                    <input
                        type="text"
                        placeholder="List char"
                        onChange={this.onValueChange}
                        value={pageNum}
                    />
                    <button className="add-char" type="submit">Add Char</button>
                </form>
            </>
        )
    }
}
