import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import App from 'src/App';

import 'assets/styles/styles.less';

const renderApp = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    );
};

renderApp(App);

if(module.hot){
    module.hot.accept('src/App', () => renderApp(App));
}