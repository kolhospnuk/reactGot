
import React, {Component} from 'react';
import './pageDetails.css';
import gotService from "../../services/gotService";
import ErrorMessage from "../errorMessage/errorMessage";

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class PageDetails extends Component {

    gotService = new gotService();

    state = {
        loading: true,
        item: null
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) return

        this.gotService.getCharacter(charId)
            .then((item) => {
                this.setState({item})
            })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const {item} = this.state;

        if (!item) {
            return <span className='select-error'>Select character</span>;
        }

        const {name} = this.state.item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}