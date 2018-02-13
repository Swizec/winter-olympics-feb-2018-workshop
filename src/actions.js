import { csv as d3Csv } from "d3-request";
import { minYearSelector, maxYearSelector, medalsSelector } from "./reducer";

export const errorLoading = error => ({
    type: "ERROR",
    error
});

export const loadData = function() {
    return function(dispatch) {
        dispatch({ type: "LOADING" });

        d3Csv(
            "data/winter.csv",
            d => ({
                year: Number(d.Year),
                city: d.City,
                athlete: d.Athlete,
                discipline: d.Discipline,
                medal: d.Medal,
                sport: d.Sport,
                gender: d.Gender,
                country: d.Country
            }),
            (error, data) => {
                if (error) {
                    dispatch(errorLoading("Error loading medals data"));
                }

                dispatch({
                    type: "GOT_MEDALS",
                    data
                });
            }
        );

        d3Csv(
            "data/gdp.csv",
            d => ({
                country: d.ISO,
                noc: d.NOC,
                gdp: Number(d["GDP.2011"].replace(/\./g, ""))
            }),
            (error, data) => {
                if (error) {
                    dispatch(errorLoading("Error loading GDP data"));
                }

                dispatch({
                    type: "GOT_GDP",
                    data
                });
            }
        );

        d3Csv(
            "data/population.csv",
            d => ({
                country: d.ISO,
                noc: d.NOC,
                name: d["Country name"],
                population: Number(d["pop.2010"].replace(/\./g, ""))
            }),
            (error, data) => {
                if (error) {
                    dispatch(errorLoading("Error loading population data"));
                }

                dispatch({
                    type: "GOT_POPULATION",
                    data
                });
            }
        );
    };
};

export const startTimeTravel = function() {
    return function(dispatch, getState) {
        dispatch({
            type: "START_TIME_TRAVEL"
        });

        let interval = setInterval(() => {
            const state = getState();

            if (state.meta.currentYear < maxYearSelector(state)) {
                dispatch({ type: "NEXT_OLYMPICS" });
            } else {
                clearInterval(interval);
            }
        }, 300);
    };
};
