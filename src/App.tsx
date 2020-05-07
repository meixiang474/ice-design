import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>111</h1>
      <Icon icon="coffee" theme="danger" size="10x"/>
      <Menu>
        <SubMenu title="123">
          <MenuItem>
            123
          </MenuItem>
        </SubMenu>
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
