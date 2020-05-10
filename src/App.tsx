import React, {useState} from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Button from './components/Button/button'
import Transition from './components/Transition/transition'
import Alert from './components/Alert/alert'

const App: React.FC = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <h1>111</h1>
      <Alert title="123" style={{margin: '100px', width: '30%'}}>321</Alert>
      <Icon icon="coffee" theme="danger" size="10x"/>
      <Menu mode="vertical" defaultOpenSubMenus={['0']}>
        <SubMenu title="123">
          <MenuItem>
            123
          </MenuItem>
        </SubMenu>
      </Menu>
      <Button onClick={(e) => setShow(!show)}>
        toggle
      </Button>
      <Transition
        in={show}
        wrapper
        animation="zoom-in-top"
        timeout={300}
      >
        <Button>
          Large
        </Button>
      </Transition>
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
