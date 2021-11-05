import React, { useState } from "react";
import styled from "styled-components";

const Div = styled.div`
        width: 45%;
        border: 1px solid skyblue;
        padding: 1em;
        background-color: #333;
        border-left: none;
        color: white;
    `;

    const FilteringOptions = styled.div`
        display: inline-block;
        width: 45%;
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

        &:hover {
            cursor: pointer;
        }
    `;

    const Input = styled.input`
        border: none;
        border-bottom: 1px solid dodgerblue;
        font-family: inherit;
        background-color: inherit;

        &:focus {
            outline: none;
        }
    `;

const CharacterFilter = (props) => {

    const [genderValue, setGenderValue] = useState("");
    const [cultureValue, setCultureValue] = useState("");

    const changeGenderHandler = (e) => {
        props.changeGenderValue(e.target.value);
        setGenderValue(e.target.value);
    }

    const changeCultureValue = (e) => {
        props.changeCultureValue(e.target.value);
        setCultureValue(e.target.value);
    }

    return(
        <Div>
            <h3>Character Filtering Options</h3>
            <FilteringOptions>
                <Label htmlFor="gender">By Gender:</Label>
                <Select id="gender" value={genderValue} onChange={changeGenderHandler}>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="unknown">Unknown</option>
                </Select>
            </FilteringOptions>
            <FilteringOptions>
                <Label htmlFor="culture">By Culture:</Label>
                <Input id="culture" type="text" value={cultureValue} onChange={changeCultureValue} />
            </FilteringOptions>
        </Div>
    );

}

export default CharacterFilter;