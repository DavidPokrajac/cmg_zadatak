import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
background-color: rgb(41, 39, 39);
`;

const Table = styled.table`
border: 1px solid skyblue;
margin: 1em auto;
background-color: #333;
width: 90%;
border-collapse: collapse;
color: whitesmoke;
`

const LeadingHeaderCells = styled.th`
font-size: 1.2em;
border: 1px solid skyblue; 
padding: 0.5em;
background-color: dodgerblue;
color: white;
`;

const OtherRows = styled.td`
text-align: center;
font-size: 1.1em;
border: 1px solid skyblue;
padding: 0.5em 0.4em;
`;

const HouseDetails = () => {

    const [houseData, setHouseData] = useState([]);

    const location = useLocation();
    const { mainURL } = location.state;
    
    useEffect(() => {

        fetch(mainURL)
            .then(response => response.json())
            .then(data => {
                setHouseData(data);
            })
            .catch(error => console.log("Error thrown ", error));

    }, []);

    return(
        <Fragment>
            <Link to="/" style={{textDecoration: "none", display: "inline-block", margin: "1em", color: "dodgerblue"}}>Go Back</Link>
            <Div>
                <Table>
                    <tbody>
                        <tr>
                            <LeadingHeaderCells>Name of the house</LeadingHeaderCells>
                            <OtherRows>{houseData.name === "" ? "None" : houseData.name}</OtherRows>
                        </tr>
                        <tr>
                            <LeadingHeaderCells>Region</LeadingHeaderCells>
                            <OtherRows>{houseData.region === "" ? "None" : houseData.region}</OtherRows>
                        </tr>
                        <tr>
                            <LeadingHeaderCells>Coat of Arms</LeadingHeaderCells>
                            <OtherRows>{houseData.coatOfArms === "" ? "None" : houseData.coatOfArms}</OtherRows>
                        </tr>
                        <tr>
                            <LeadingHeaderCells>Words</LeadingHeaderCells>
                            <OtherRows>{houseData.words === "" ? "None" : houseData.words}</OtherRows>
                        </tr>
                        <tr>
                            <LeadingHeaderCells>Titles</LeadingHeaderCells>
                            <OtherRows>{houseData.titles}</OtherRows>
                        </tr>
                        <tr>
                            <LeadingHeaderCells>Seats</LeadingHeaderCells>
                            <OtherRows>{houseData.seats}</OtherRows>
                        </tr>
                        <tr>
                            <LeadingHeaderCells>Has died out</LeadingHeaderCells>
                            <OtherRows>{houseData.diedOut === "" ? "No" : "Yes"}</OtherRows>
                        </tr>
                        <tr>
                            <LeadingHeaderCells>Has overlord</LeadingHeaderCells>
                            <OtherRows>{houseData.overlord === "" ? "No" : "Yes"}</OtherRows>
                        </tr>
                        <tr>
                            <LeadingHeaderCells>Number of Cadet Branches</LeadingHeaderCells>
                            <OtherRows>{houseData.cadetBranches}</OtherRows>
                        </tr>
                    </tbody>
                </Table>
            </Div>
        </Fragment>
    );

}

export default HouseDetails;