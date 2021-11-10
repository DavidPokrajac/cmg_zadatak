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

    const { died, born, aliases, name, allegiances, gender, culture, books } = props.character;

    const diedYear = died.split(" ").filter(d => +d).join("");
    const birthYear = born.split(" ").filter(d => +d).join("").slice(0, 3);

    const ageOfDeath = +diedYear - +birthYear;

    const alias = aliases;
    const aliasCopy = [...alias].filter(char => char !== name).join(", ");

    const houseRootURL = "https://www.anapioficeandfire.com/api/houses/";

    const houses = allegiances.map(all => all.slice(houseRootURL.length));

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
                    {aliasCopy && name !== "" ? name + ", " + aliasCopy : 
                    name === "" ? aliasCopy :
                    name !== "" && aliasCopy === "" ? name : ""}
                </CharacterRow>
                <OtherRows>{died === "" || diedYear === "" ? "Yes" : birthYear === "" ? "Died at unknown age" : "No, died at " + ageOfDeath + " years old"}</OtherRows>
                <OtherRows>{gender === "" ? "Unknown" : gender}</OtherRows>
                <OtherRows>{culture === "" ? "Unknown" : culture}</OtherRows>
                <OtherRows>{houses2}</OtherRows>
                <OtherRows>{books.length}</OtherRows>
            </tr>
        </Fragment>
    );

}

export default Character;