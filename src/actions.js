import { csv as d3Csv } from "d3-request";

// error action
const errorAction = error => ({
    type: "ERROR",
    error
});

// load data thunk
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
                    dispatch(errorAction("Error loading medals data"));
                }

                dispatch({
                    type: "GOT_MEDALS",
                    data
                });
            }
        );
    };
};

// start time travel thunk
export const startTimeTravel = function() {
    return function(dispatch, getState) {};
};
