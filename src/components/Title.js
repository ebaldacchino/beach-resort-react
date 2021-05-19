import React from 'react';

const Title = ({ children }) => {
	return <div className='section-title'>
        <h4>{children}</h4>
        <div></div>
    </div>;
};

export default Title;
