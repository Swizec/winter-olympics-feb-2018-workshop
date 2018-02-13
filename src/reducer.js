import { combineReducers } from "redux";
import { createSelector } from "reselect";

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
    error: null
};

const metaReducer = (state = defaultMetaState, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true };
        case "ERROR":
            return { ...state, error: action.error };
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

export const medalsSelector = createSelector(
    state => state.data.medals,
    medals => medals || []
);

const rootReducer = combineReducers({
    data: dataReducer,
    meta: metaReducer
});

export default rootReducer;
