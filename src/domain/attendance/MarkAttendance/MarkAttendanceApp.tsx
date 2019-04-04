import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { createGraphQLClient } from "../../../createGraphQLClient";
import MarkAttendance from "./MarkAttendance";
import '../../../css/dark.css';

const graphQLClient = createGraphQLClient();

export default function init() {
    setTimeout(function () {
        ReactDOM.render(
            <ApolloProvider client={graphQLClient}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/plugins/ems-attendance/page/markattendance" component={MarkAttendance} />
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>,
            document.getElementById("mountMarkAttendance"));
    }, 100);
}