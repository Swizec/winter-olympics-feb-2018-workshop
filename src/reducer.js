import { combineReducers } from "redux";
import { createSelector } from "reselect";

const defaultDataState = {
    loading: true,
    medals: null,
    population: null,
    gdp: null
};

const dataReducer = (state = defaultDataState, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true };
        default:
            return state;
    }
};

export const allDataLoaded = createSelector(
    state => state.data.medals,
    state => state.data.population,
    state => state.data.gdp,
    (medals, population, gdp) => [medals, population, gdp].every(d => !!d)
);

const rootReducer = combineReducers({
    data: dataReducer
});

export default rootReducer;
