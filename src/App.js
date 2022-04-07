import { useContext } from 'react';
import { StateProvider } from './Context/StateContext';
import './style/App.css';
import SideBar from './SideBar';
import Render from './ConditionalRenderPage';
import { Context } from './Context/StateContext'

function App() {
  const { page } = useContext(Context)
  return (
    // <StateProvider>
      <div className="App">
        <header className="App-header">
          <h1 style={{fontSize: 25, marginLeft: 20}}>Dashboard - Bot Atendente Telegram</h1>
        </header>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <SideBar />
          <Render page={page} />
        </div>
      </div>
    // </StateProvider>
  );
}

export default App;
