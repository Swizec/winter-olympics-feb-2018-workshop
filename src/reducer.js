import { combineReducers } from "redux";
import { createSelector } from "reselect";
import * as d3 from "d3";

const defaultDataState = {
    medals: null,
    population: null,
    gdp: null
};

// data reducer

const defaultMetaState = {
    loading: false,
    error: null,
    currentYear: null,
    years: null
};

// meta reducer

// all data loaded selector

// all medals selector
export const allMedalsSelector = createSelector(
    state => state.data.medals,
    medals => medals || []
);

// medals current year selector

// gdp selector
// max gdp

// population
// max population

// min year
// max year

// medals per country

// country gdp helper

// country population helper

const rootReducer = combineReducers({
    data: dataReducer,
    meta: metaReducer
});

export default rootReducer;
