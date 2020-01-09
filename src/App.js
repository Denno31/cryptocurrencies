import React from "react";
import Header from "./components/common/Header";
import List from "./components/list/List";
import Detail from "./components/details/Detail";
import "./index.css";
import NotFound from "./components/notfound/Notfound";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={List} exact />
          <Route exact path="/currency/:id" component={Detail} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
