import React from "react";
import styled from "styled-components";

const CaptionText = styled.text`
    font-size: 0.5em;
    font-weight: 400;
`;

const Caption = ({ x, y, children }) => (
    <CaptionText x={x} y={y}>
        {children}
    </CaptionText>
);

export default Caption;
