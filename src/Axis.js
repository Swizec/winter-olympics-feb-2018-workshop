import React from "react";
import D3blackbox from "./D3blackbox";
import * as d3 from "d3";

const Axis = D3blackbox(function() {
    const { domain, range, type } = this.props;
    let { scale } = this.props;

    if (!scale) {
        scale = d3
            .scaleLinear()
            .domain(domain)
            .range(range);
    }

    const axis = d3[`axis${type}`](scale);

    d3.select(this.refs.anchor).call(axis);
});

export default Axis;
