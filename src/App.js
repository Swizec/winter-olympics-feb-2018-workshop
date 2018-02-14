import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { min as d3Min, max as d3Max } from "d3";
import styled from "styled-components";

import OlympicsDashboard from "./OlympicsDashboard";
import reducer, {
    allDataLoadedSelector,
    minYearSelector,
    maxYearSelector
} from "./reducer";
import { loadData } from "./actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(loggerMiddleware, thunkMiddleware))
);

class App extends Component {
    componentDidMount() {
        this.props.loadData();
    }

    render() {
        // error state
        // loading state
        // viz state
        const { allDataLoaded, error, minYear, maxYear } = this.props;

        if (error) {
            return <h1 style={{ color: "red" }}>{error}</h1>;
        } else if (!allDataLoaded) {
            return <h1>Loading ...</h1>;
        } else {
            return (
                <div>
                    <h1>
                        Olympic Winter Medals {minYear} - {maxYear}
                    </h1>
                    <OlympicsDashboard />
                </div>
            );
        }
    }
}

const ConnectedApp = connect(
    state => ({
        allDataLoaded: allDataLoadedSelector(state),
        error: state.meta.error,
        minYear: minYearSelector(state),
        maxYear: maxYearSelector(state)
    }),
    {
        loadData
    }
)(App);

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
