import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { min as d3Min, max as d3Max } from "d3";
import styled from "styled-components";

import reducer, {
    allDataLoaded,
    medalsSelector,
    maxYearSelector,
    minYearSelector
} from "./reducer";
import { loadData, startTimeTravel } from "./actions";
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
        const {
            loading,
            error,
            allDataLoaded,
            minYear,
            maxYear,
            currentYear,
            startTimeTravel
        } = this.props;

        if (error) {
            return <h1 style={{ color: "red" }}>{error}</h1>;
        } else if (!allDataLoaded) {
            return <h1>Loading data ...</h1>;
        } else {
            return (
                <div>
                    <h1>
                        Winter Olympics Medals{" "}
                        {currentYear ? currentYear : `${minYear} - ${maxYear}`}
                    </h1>
                    <OlympicsDashboard />
                    <br />
                    <button onClick={startTimeTravel}>Time Travel</button>
                </div>
            );
        }
    }
}

const ConnectedApp = connect(
    state => ({
        loading: state.meta.loading,
        error: state.meta.error,
        allDataLoaded: allDataLoaded(state),
        minYear: minYearSelector(state),
        maxYear: maxYearSelector(state),
        currentYear: state.meta.currentYear
    }),
    {
        loadData,
        startTimeTravel
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
