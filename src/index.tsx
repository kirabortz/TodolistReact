import React from 'react';
import './index.css';
import App from './app/App';
import {createRoot} from 'react-dom/client';

import {store} from './app/Store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);

root.render(<BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);

