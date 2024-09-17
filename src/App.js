import './App.css';
import Website from './components/BotiqueList';
import Header from './components/AppHeader';

function App() {
  return (
    <div className="App">
      <header className="App-header"> 
        <Header/>      
        <Website/>  
      </header>
    </div>
  );
}

export default App;
