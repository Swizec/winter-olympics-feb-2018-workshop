export const loadData = function() {
    return function(dispatch) {
        dispatch({ type: "LOADING" });
    };
};
