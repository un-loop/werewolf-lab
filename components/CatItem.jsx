import * as React from "react";

export default (props) =>
(
    <li>
        <div>name: {props.cat.name}</div>
        <div>age: {props.cat.age}</div>
        <div>owner: {props.cat.owner}</div>
    </li>
)
