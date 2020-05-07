import React from 'react';
import Tab from './components/Tab/tab'
import TabItem from './components/Tab/tabItem'

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>111</h1>
      <Tab onSelect={(v) => console.log(v)} mode="vertical">
        <TabItem label="1">
          111
        </TabItem>
        <TabItem label="2">
          222
        </TabItem>
        <TabItem label="3" disabled>
          333
        </TabItem>
      </Tab>
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
