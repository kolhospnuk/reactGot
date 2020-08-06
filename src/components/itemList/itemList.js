
import React, {Component} from 'react';
import './itemList.css';
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

export default class ItemList extends Component {

    state = {
        itemList: null
    }

    static defaultProps = {
        onItemSelected: () =>{}
    }

    // static propTypes = {
    //     onItemSelected: PropTypes.func
    // }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    componentDidMount() {
        this.updateList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.pageNum !== prevProps.pageNum) {
            this.updateList();
        }
    }

    updateList() {
        const {getData} = this.props;

        getData(this.props.pageNum)
            .then((itemList) => {
                this.setState({itemList})
            })
    }

    renderItems(arr) {
        const pageNum = `${this.props.pageNum - 1}` + 1;

        return arr.map((item, i) => {
            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(+pageNum + i)}
                    >
                    {label}
                </li>
            )
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const {itemList} = this.state;

        if (!itemList) return <Spinner/>;

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}


