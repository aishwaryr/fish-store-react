import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss} from 'react-router';

import './css/style.css';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

// A stateless func for routing
const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={StorePicker}></Match>
                <Match pattern="/store/:storeId" component={App}></Match>
                <Miss component={NotFound}></Miss>
            </div>
        </BrowserRouter>
    )
}

// Changed Render-> App to Root so it will render comp based on url
render(<Root/>, document.querySelector('#main'));
