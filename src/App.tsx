import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
const App: React.FC = () => {
  return (
    <div className="App">
      <h1>111</h1>
      <Menu defaultIndex={0}>
        <MenuItem index={0}>
          cool link
        </MenuItem>
        <MenuItem index={1}>
          cool link
        </MenuItem>
      </Menu>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
    </div>
  );
}

export default App;
