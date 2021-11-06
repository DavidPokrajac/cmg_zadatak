import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CharacterRow = styled.td`
    width: 40%;
    font-size: 1.1em;
    border: 1px solid skyblue;
    box-shadow: 0 0 2px skyblue;
    padding: 0.3em 0.2em;
`;

const OtherRows = styled.td`
    text-align: center;
    font-size: 1.1em;
    border: 1px solid skyblue;
    box-shadow: 0 0 2px skyblue;
    padding: 0.5em 0.4em;
`;

const Character = (props) => {

    const diedYear = props.character.died.split(" ").filter(d => {
        return +d
    }).join("")
    const birthYear = props.character.born.split(" ").filter(d => {
        return +d
    }).join("").slice(0, 3)

    const ageOfDeath = +diedYear - +birthYear;

    const aliases = props.character.aliases;
    const aliasCopy = [...aliases].filter(char => {
        return char !== props.character.name;
    }).join(", ")

    const houseRootURL = "https://www.anapioficeandfire.com/api/houses/";

    const houses = props.character.allegiances.map(all => {
        return all.slice(houseRootURL.length);
    })

    const houses2 = houses.map(h => {
        return <Link to={{
            pathname: "/house/" + h,
            state: {
                mainURL: houseRootURL + h
            }
        }} style={{textDecoration: "none", color: "dodgerblue", margin: "0 0.2em"}}>{h}</Link>
    })

    return(
        <Fragment>
            <tr>
                <CharacterRow>
                    {aliasCopy && props.character.name !== "" ? props.character.name + ", " + aliasCopy : 
                    props.character.name === "" ? aliasCopy :
                    props.character.name !== "" && aliasCopy === "" ? props.character.name : ""}
                </CharacterRow>
                <OtherRows>{props.character.died === "" || diedYear === "" ? "Yes" : "No, died at " + ageOfDeath + " years old"}</OtherRows>
                <OtherRows>{props.character.gender === "" ? "Unknown" : props.character.gender}</OtherRows>
                <OtherRows>{props.character.culture === "" ? "Unknown" : props.character.culture}</OtherRows>
                <OtherRows>{houses2}</OtherRows>
                <OtherRows>{props.character.books.length}</OtherRows>
            </tr>
        </Fragment>
    );

}

export default Character;