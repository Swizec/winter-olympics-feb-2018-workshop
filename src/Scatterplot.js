import React, { Component } from "react";
import * as d3 from "d3";

import Axis from "./Axis";

class Scatterplot extends Component {
    xScale = d3.scaleLog();
    yScale = d3.scaleLog();

    componentWillMount() {
        this.updateD3(this.props);
    }
    componentWillUpdate(newProps) {
        this.updateD3(newProps);
    }

    updateD3(props) {
        const { width, height, data } = props;

        this.xScale.range([30, width]).domain(d3.extent(data, ({ x }) => x));
        this.yScale.range([height, 0]).domain(d3.extent(data, ({ y }) => y));
    }

    render() {
        const { x, y, height, width, xDomain, yDomain, data } = this.props;

        const marginLeft = 30,
            marginBottom = 20;

        return (
            <g transform={`translate(${x}, ${y})`}>
                <Axis type="Bottom" x={0} y={height} scale={this.xScale} />
                <Axis type="Left" x={marginLeft} y={0} scale={this.yScale} />
                <g>
                    {data.map(({ x, y, country }) => (
                        <circle
                            cx={this.xScale(x)}
                            cy={this.yScale(y)}
                            r={2}
                            key={country}
                        />
                    ))}
                </g>
            </g>
        );
    }
}

export default Scatterplot;
