import React from 'react';

// This is a stateless function, it doesnt extends React.Component
// cause it doesn't have any other functionality than to just show some HTML.

const Header = (props) => {
    return (
        <header className="top">
            <h1>
                Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
                Day
            </h1>
            <h3 className="tagline">
                <span>{props.tagline}</span>
            </h3>
        </header>
    )
}

export default Header;
