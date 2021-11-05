import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import CharactersTable from "./Components/CharactersTable";
import HouseDetails from "./Components/HouseDetails";

function App() {
  
  return (
    <Fragment>
      <Switch>
        <Route exact path="/">
          <CharactersTable />
        </Route>
        <Route path="/house/:houseId">
          <HouseDetails />
        </Route>
      </Switch>
    </Fragment>
  );

}

export default App;
