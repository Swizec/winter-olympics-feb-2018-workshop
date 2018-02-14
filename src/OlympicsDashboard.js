import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import * as d3 from "d3";

import Scatterplot from "./Scatterplot";
import Caption from "./Caption";
import { medalsPerCountrySelector, countryGdp } from "./reducer";

const mapStateToProps = state => ({
    scatterplot1: createSelector(medalsPerCountrySelector, medalsPerCountry => {
        return Object.keys(medalsPerCountry)
            .map(country => ({
                x: countryGdp(state, country),
                y: medalsPerCountry[country].length,
                country
            }))
            .filter(({ x }) => x > 0);
    })(state),

    scatterplot2: createSelector(medalsPerCountrySelector, medalsPerCountry => {
        return Object.keys(medalsPerCountry)
            .map(country => ({
                x: countryPopulation(state, country),
                y: medalsPerCountry[country].length,
                country
            }))
            .filter(({ x }) => x > 0);
    })(state)
});
const mapDispatchToProps = {};

const OlympicsDashboard = ({ scatterplot1 }) => (
    <svg width="1024" height="486">
        <Scatterplot
            data={scatterplot1}
            x={10}
            y={10}
            width={600}
            height={400}
        />
    </svg>
);

export default connect(mapStateToProps, mapDispatchToProps)(OlympicsDashboard);
