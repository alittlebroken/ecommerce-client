import React from 'react';
import './Brand.css';

import { Link } from 'react-router-dom';

const Brand = (props) => {
    return <div id="brand"><Link to="/">{props.appName}</Link></div>;
};

export default Brand;