import * as React from "react";
import CatItem from "./CatItem";

export default (props) =>
    (
        <ul>
            {props.cats.map( (cat, i) => <CatItem cat={cat} key={i} />)}
        </ul>
    )
