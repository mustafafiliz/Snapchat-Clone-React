import React from "react";
import { Navigator, Store } from "./Modules";

import { Provider } from "react-redux";

class App extends React.PureComponent {
  render() {
    return (
      <div className="app">
        <Provider store={Store}>
          <div className="app__body">
            <Navigator />
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
