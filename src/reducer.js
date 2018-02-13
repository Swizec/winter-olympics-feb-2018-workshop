import { combineReducers } from "redux";
import { createSelector } from "reselect";
import * as d3 from "d3";

const defaultDataState = {
    medals: null,
    population: null,
    gdp: null
};

const dataReducer = (state = defaultDataState, action) => {
    const { data } = action;

    switch (action.type) {
        case "GOT_MEDALS":
            return { ...state, medals: data };
        case "GOT_GDP":
            return { ...state, gdp: data };
        case "GOT_POPULATION":
            return { ...state, population: data };
        default:
            return state;
    }
};

const defaultMetaState = {
    loading: false,
    error: null,
    currentYear: null,
    years: null
};

const metaReducer = (state = defaultMetaState, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true
            };
        case "ERROR":
            return {
                ...state,
                error: action.error
            };
        case "START_TIME_TRAVEL":
            return {
                ...state,
                currentYear: state.years[0],
                yearIndex: 0
            };
        case "GOT_MEDALS":
            return {
                ...state,
                years: [...new Set(action.data.map(d => d.year))].sort(
                    (a, b) => a - b
                )
            };
        case "NEXT_OLYMPICS":
            return {
                ...state,
                currentYear: state.years[state.yearIndex + 1],
                yearIndex: state.yearIndex + 1
            };
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

export const allMedalsSelector = createSelector(
    state => state.data.medals,
    medals => medals || []
);

export const medalsSelector = createSelector(state => {
    const { data: { medals }, meta: { currentYear } } = state;
    return currentYear ? medals.filter(d => d.year === currentYear) : medals;
}, medals => medals || []);

export const gdpSelector = createSelector(
    state => state.data.gdp,
    gdp => gdp || []
);
export const maxGDPSelector = createSelector(gdpSelector, gdp =>
    d3.max(gdp, d => d.gdp)
);

export const populationSelector = createSelector(
    state => state.data.population,
    population => population || []
);

export const maxPopulationSelector = createSelector(
    populationSelector,
    population => d3.max(population, d => d.population)
);

export const minYearSelector = createSelector(allMedalsSelector, medals =>
    d3.min(medals, d => d.year)
);
export const maxYearSelector = createSelector(allMedalsSelector, medals =>
    d3.max(medals, d => d.year)
);

export const medalsPerCountrySelector = createSelector(
    medalsSelector,
    medals => {
        let medalsPerCountry = {};
        medals.forEach(medal => {
            medalsPerCountry[medal.country] = [
                ...(medalsPerCountry[medal.country] || []),
                medal
            ];
        });
        return medalsPerCountry;
    }
);

export const countryGdp = (state, needle) => {
    let val = gdpSelector(state).find(({ country }) => country === needle);
    if (!val) {
        val = gdpSelector(state).find(({ noc }) => noc === needle);
    }

    return val ? val.gdp : 0;
};

export const countryPopulation = (state, needle) => {
    let val = populationSelector(state).find(
        ({ country }) => country === needle
    );
    if (!val) {
        val = populationSelector(state).find(({ noc }) => noc === needle);
    }

    return val ? val.population : 0;
};

const rootReducer = combineReducers({
    data: dataReducer,
    meta: metaReducer
});

export default rootReducer;
