import * as React from "react";
import * as axios from "axios";
import CatList from "./CatList"
import CatForm from "./CatForm"

export default class CatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { adding: false, newCat: {} }
        this.props = props;
        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onAdd(e) {
        e.preventDefault();

        this.setState({adding:true});
    }

    onChange(target) {
        var newCat = {...this.state.newCat};
        newCat[target.name] = target.value;
        this.setState( {newCat: newCat });
    }

    onSave() {
        axios.post("/api/cats/", this.state.newCat)
        .then ( () => this.load() )
        .then(
            this.setState({ newCat: {}, adding: false})
        ).catch(
            //todo: set an error condition
        )
    }

    onCancel() {
        this.setState({ newCat: {}, adding: false});
    }

    componentDidMount() {
        this.load();
    }

    async load() {
        var response = await axios.get("/api/cats");
        this.setState({ cats: response.data });
    }

    render() {
        return (
            <div>
                <button onClick={this.onAdd}>
                    Add
                </button>
                {this.state.adding && <CatForm cat={this.state.newCat} onChange={this.onChange} onSave={this.onSave} onReset={this.onCancel} /> }
                { this.state.cats && this.state.cats.length && <CatList cats={this.state.cats} /> }
            </div>
        )
    }
}
