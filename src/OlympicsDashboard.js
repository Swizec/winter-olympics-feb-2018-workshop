import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import * as d3 from "d3";

import Scatterplot from "./Scatterplot";
import Caption from "./Caption";
import {} from "./reducer";

const mapStateToProps = state => ({});
const mapDispatchToProps = {};

const OlympicsDashboard = ({}) => <svg width="1024" height="486" />;

export default connect(mapStateToProps, mapDispatchToProps)(OlympicsDashboard);
