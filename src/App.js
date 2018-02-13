import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import reducer, { allDataLoaded } from "./reducer";
import { loadData } from "./actions";

const store = createStore(
    reducer,
    applyMiddleware(loggerMiddleware, thunkMiddleware)
);

class App extends Component {
    render() {
        const { loading, allDataLoaded } = this.props;

        if (loading || !allDataLoaded) {
            return <h1>Loading data ...</h1>;
        } else {
            return <h1>Have it</h1>;
        }
    }
}

const ConnectedApp = connect(
    state => ({
        loading: state.data.loading,
        allDataLoaded: allDataLoaded(state)
    }),
    {
        loadData
    }
)(App);

export default () => (
    <Provider store={store}>
        <ConnectedApp />
    </Provider>
);
