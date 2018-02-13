import React from "react";
import { connect } from "react-redux";

import Scatterplot from "./Scatterplot";

const mapStateToProps = null;
const mapDispatchToProps = {};

const OlympicsDashboard = () => (
    <svg width="1920" height="1080">
        <Scatterplot x={0} y={0} height={300} width={400} />
    </svg>
);

export default connect(mapStateToProps, mapDispatchToProps)(OlympicsDashboard);
