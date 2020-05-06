import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
const App: React.FC = () => {
  return (
    <div className="App">
      <h1>111</h1>
      <Menu defaultIndex="0" mode="vertical" onSelect={(e) => console.log(e)} defaultOpenSubMenus={['2']}>
        <MenuItem index="1">
          cool lin1
        </MenuItem>
        <MenuItem index="0">
          cool link
        </MenuItem>
        <SubMenu title="2">
          <MenuItem>
           111
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
