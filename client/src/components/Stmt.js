import React from 'react';

export function Stmt(props)
{
    return <p
        style={{
            fontSize: "1.4em",
            fontWeight: "bolder",
            marginBottom: "0",
            display: `${props.status === '' ? "none" : "block"}`
        }}>
        {props.status}
    </p>;
}