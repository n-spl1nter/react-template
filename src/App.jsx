import React, {Component} from 'react';
import {Provider} from 'react-redux';

import store from 'store';

window.store = store;

class App extends Component{

    render(){
        return(
            <Provider store={store} key={module.hot ? Date.now() : store}>
                <div>
                    Start template
                </div>
            </Provider>
        )
    }

}
export default App;