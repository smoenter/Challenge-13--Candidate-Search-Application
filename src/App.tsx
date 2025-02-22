import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <>
    <div className="App">
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
    </>
  );
}

export default App;
