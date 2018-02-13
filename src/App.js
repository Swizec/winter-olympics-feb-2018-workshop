import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { min as d3Min, max as d3Max } from "d3";
import styled from "styled-components";

import OlympicsDashboard from "./OlympicsDashboard";

const store = createStore(
    reducer,
    applyMiddleware(loggerMiddleware, thunkMiddleware)
);

class App extends Component {
    componentDidMount() {
        this.props.loadData();
    }

    render() {
        // error state
        // loading state
        // viz state
    }
}

const ConnectedApp = connect(state => ({}), {})(App);

const Container = styled.div`
    padding: 25px;
`;

export default () => (
    <Provider store={store}>
        <Container>
            <ConnectedApp />
        </Container>
    </Provider>
);
