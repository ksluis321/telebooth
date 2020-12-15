import React, { useState } from 'react';

import AppContext from '../../contexts/appContext';
import Users from '../Users';
import RenderMessages from '../Messages';
import Header from './Header';

const INITIAL_STATE = {
  isLoggedIn: false,
  adminId: 1435261781,
  currentChatId: null,
  userId: 1,
  username: null,
  botUserName: "AirtableTGBot",
};

const Main = () => {
  const [appState, setAppState] = useState(INITIAL_STATE);

  const updateState = (toUpdateState) => {
    setAppState({
      ...appState,
      ...toUpdateState,
    });
  };

  return (
    <AppContext.Provider value={{ appState, updateState }}>
      <Header />
      <div className="chatWrapper">
        <div className="wd25">
          <Users />
        </div>
        <div className="wd75">
          <RenderMessages />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default Main;