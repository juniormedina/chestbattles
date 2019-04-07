import React from "react";
import './content.scss';

const content = props => (
  <div className="content">
    {props.children}
  </div>
);

export default content;
