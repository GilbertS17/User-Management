import React from 'react';
import { InitialProps } from './Initial.types';

const Initial: React.FC<InitialProps> = ({ text }) => (
    <div className="initial-container">
        <h1 className="card-initial">{text}</h1>
    </div>
);

export default Initial;
