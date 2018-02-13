import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import * as d3 from "d3";

import Scatterplot from "./Scatterplot";
import Caption from "./Caption";
import {
    medalsPerCountrySelector,
    countryGdp,
    maxGDPSelector,
    countryPopulation,
    populationSelector,
    maxPopulation,
    maxPopulationSelector
} from "./reducer";

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
    maxGDP: maxGDPSelector(state),

    scatterplot2: createSelector(medalsPerCountrySelector, medalsPerCountry => {
        return Object.keys(medalsPerCountry)
            .map(country => ({
                x: countryPopulation(state, country),
                y: medalsPerCountry[country].length,
                country
            }))
            .filter(({ x }) => x > 0);
    })(state),
    maxPopulation: maxPopulationSelector(state)
});
const mapDispatchToProps = {};

const OlympicsDashboard = ({
    scatterplot1,
    maxGDP,
    scatterplot2,
    maxPopulation
}) => (
    <svg width="1024" height="486">
        <Caption x={0} y={30}>
            Medals vs. GDP
        </Caption>
        <Scatterplot
            x={0}
            y={50}
            height={400}
            width={500}
            xDomain={[0, 200]}
            yDomain={[0, maxGDP]}
            data={scatterplot1}
        />
        <Caption x={550} y={30}>
            Medals vs. Population
        </Caption>
        <Scatterplot
            x={550}
            y={50}
            height={400}
            width={500}
            xDomain={[0, 200]}
            yDomain={[0, maxPopulation]}
            data={scatterplot2}
        />
    </svg>
);

export default connect(mapStateToProps, mapDispatchToProps)(OlympicsDashboard);
