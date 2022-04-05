import './style/App.css';
import SideBar from './SideBar';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{fontSize: 25, marginLeft: 10}}>Dashboard</h1>
      </header>
      < SideBar />
    </div>
  );
}

export default App;
