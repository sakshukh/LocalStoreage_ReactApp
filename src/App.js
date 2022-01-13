import store from "./redux/rootReducer";
import { Provider } from 'react-redux'
import User from "./components/User";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <User />

      </div>
    </Provider>

  );
}

export default App;
