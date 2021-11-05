import React, { Fragment, useState, useEffect, useRef } from "react";
import Character from "./Character";
import ResultsFilter from "./ResultsFilter";
import CharacterFilter from "./CharacterFilter";
import styled from "styled-components";

const MainTitle = styled.h1`
        text-align: center;
        color: skyblue;
    `;

    const Table = styled.table`
        border: 1px solid skyblue;
        margin: 1em auto;
        background-color: #333;
        width: 90%;
        border-collapse: collapse;
        color: white;
    `

    const LeadingHeaderCells = styled.th`
        font-size: 1.2em;
        border: 1px solid skyblue; 
        padding: 0.5em;
        background-color: dodgerblue;
        color: white;
    `;

    const Button = styled.button`
        display: inline-block;
        padding: 0.5em 1em;
        font-family: inherit;
        text-transform: uppercase;
        font-size: 1.1em;
        background-color: dodgerblue;
        color: white;
        border: none;
        margin: 1em;

        &:hover {
            cursor: pointer;
            transform: scale(1.2);
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.7);
            transition: transform 0.5s ease-in-out, box-shadow 0.4s ease-in-out;
        }
    `;

const CharactersTable = () => {

    const [characters, setCharacters] = useState([]);
    const [results, setResults] = useState(25);
    const [pageNumber, setPageNumber] = useState(1);
    const [genderValue, setGenderValue] = useState("");
    const [cultureValue, setCultureValue] = useState("");

    const nextPageButton = useRef();
    const firstPageButton = useRef();
    const prevPageButton = useRef();
    const lastPageButton = useRef();

    useEffect(() => {

        let basicRequest = "https://www.anapioficeandfire.com/api/characters?page=" + pageNumber + "&pageSize=" + results;
        
        if(genderValue) {
            basicRequest += "&gender=" + genderValue;
        } else if(cultureValue) {
            basicRequest += "&culture=" + cultureValue
        } else if(genderValue && cultureValue) {
            basicRequest += "&gender=" + genderValue + "&culture=" + cultureValue;
        }
        
        fetch(basicRequest)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCharacters(data);
            })
            .catch(error => console.log("Error thrown ", error));

    }, [results, pageNumber, genderValue, cultureValue]);


    const changeResults = (e) => {
        setResults(e);
    }

    const changeGenderValue = (e) => {
        setGenderValue(e);
    }

    const changeCultureValue = (e) => {
        setCultureValue(e);
    }

    const firstPageHandler = () => {
        setPageNumber(1);
        prevPageButton.current.disabled = true;
        nextPageButton.current.disabled = false;
    }

    const previousPageHandler = () => {
        if(pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        } 
        nextPageButton.current.disabled = false;
    }

    const nextPageHandler = () => {
        setPageNumber(pageNumber + 1);
        prevPageButton.current.disabled = false;
    }

    const lastPageHandler = () => {
        if(results === 10) {
            setPageNumber(214);
            nextPageButton.current.disabled = true;
            prevPageButton.current.disabled = false;
        }
        if(results === 25) {
            setPageNumber(86);
            nextPageButton.current.disabled = true;
            prevPageButton.current.disabled = false;
        }
        if(results === 50) {
            setPageNumber(43);
            nextPageButton.current.disabled = true;
            prevPageButton.current.disabled = false;
        }
    }

    return(
        <Fragment>
            <MainTitle>Table of characters</MainTitle>
            <section style={{display: "flex", justifyContent: "center"}}>
                <ResultsFilter changeResults={changeResults} />
                <CharacterFilter changeGenderValue={changeGenderValue} changeCultureValue={changeCultureValue} />
            </section>
            <Table>
                <thead>
                    <tr>
                        <LeadingHeaderCells>Character</LeadingHeaderCells>
                        <LeadingHeaderCells>Alive</LeadingHeaderCells>
                        <LeadingHeaderCells>Gender</LeadingHeaderCells>
                        <LeadingHeaderCells>Culture</LeadingHeaderCells>
                        <LeadingHeaderCells>Allegiances</LeadingHeaderCells>
                        <LeadingHeaderCells># of Books</LeadingHeaderCells>
                    </tr>
                </thead>
                <tbody>
                {characters.map(character => {
                    return(
                        <Character 
                            key={Math.floor(Math.random() * 10000)} character={character} 
                        />
                    );
                })}
                </tbody>
            </Table>
            <section style={{display: "flex", justifyContent: "center"}}>
                <Button onClick={firstPageHandler} ref={firstPageButton}>First Page</Button>
                <Button onClick={previousPageHandler} ref={prevPageButton}>Previous Page</Button>
                <Button onClick={nextPageHandler} ref={nextPageButton}>Next Page</Button>
                <Button onClick={lastPageHandler} ref={lastPageButton}>Last Page</Button>
            </section>
        </Fragment>
    );

}

export default CharactersTable;