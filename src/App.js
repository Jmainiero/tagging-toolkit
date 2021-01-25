import './App.css';
import './styles.scss';
import Homepage from './components/homepage';

function App() {
  document.title = 'Debug tool';
  return (
    <div className="App">
      <header className="App-header">
        <Homepage />

      </header>
    </div>
  );
}

export default App;
