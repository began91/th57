import React from 'react';

function ResultRow(props) {
    return (
        <tr className={(props.ext ? "ext" : "")}>
            <th className="row-head">{props.head}</th>
            <td className={props.gray2 ? "gray col2" : "col2"}>{props.col2}</td>
            <td>{props.col3}</td>
            <td>{props.col4}</td>
        </tr>
    );
}

export default ResultRow;