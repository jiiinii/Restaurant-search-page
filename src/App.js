import './index.css';
import ProducerInfo from '../src/Components/ProducerInfo';

function App() {
  console.log(`here?`);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <ProducerInfo />
    </div>
  );
}

export default App;