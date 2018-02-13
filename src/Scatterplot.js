import React, { Component } from "react";
import Axis from "./Axis";

class Scatterplot extends Component {
    render() {
        const { x, y, height, width } = this.props;

        const marginLeft = 30,
            marginBottom = 20;

        return (
            <g transform={`translate(${x}, ${y})`}>
                <Axis
                    type="Bottom"
                    x={marginLeft}
                    y={height}
                    domain={[0, 20]}
                    range={[0, width]}
                />
                <Axis
                    type="Left"
                    x={marginLeft}
                    y={marginBottom}
                    domain={[0, 20]}
                    range={[height - marginBottom, 0]}
                />
            </g>
        );
    }
}

export default Scatterplot;
