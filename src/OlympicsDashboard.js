import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import * as d3 from "d3";

import Scatterplot from "./Scatterplot";
import { medalsPerCountrySelector, countryGdp, gdpSelector } from "./reducer";

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
    maxGDP: createSelector(gdpSelector, gdp => d3.max(gdp, d => d.gdp))(state)
});
const mapDispatchToProps = {};

const OlympicsDashboard = ({ scatterplot1, maxGDP }) => (
    <svg width="1920" height="1080">
        <Scatterplot
            x={0}
            y={20}
            height={400}
            width={500}
            xDomain={[0, 200]}
            yDomain={[0, maxGDP]}
            data={scatterplot1}
        />
    </svg>
);

export default connect(mapStateToProps, mapDispatchToProps)(OlympicsDashboard);
