import React, { useState } from "react";
import styled from "styled-components";

const Div = styled.div`
        width: 45%;
        border: 1px solid skyblue;
        border-right: none;
        padding: 1em;
        background-color: #333;
        color: white;
    `;

    const Label = styled.label`
        display: inline-block;
        font-size: 1.1em;
        margin-right: 1em;
    `;

    const Select = styled.select`
        font-family: inherit;
        font-size: 1em;
        padding: 0.2em;
        background-color: dodgerblue;
        color: white;
        border: none; 
        border-radius: 5px;
        width: 15%; 

        &:hover {
            cursor: pointer;
        }
    `;

const ResultsFilter = (props) => {

    const [value, setValue] = useState("25");

    const changeResultsHandler = (e) => {
        props.changeResults(e.target.value);
        setValue(e.target.value);
    }

    return(
        <Div>
            <h3>Results per Page Filtering Options</h3>
            <Label htmlFor="results">Results per page:</Label>
            <Select id="results" value={value} onChange={changeResultsHandler}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </Select>
        </Div>
    );

}

export default ResultsFilter;