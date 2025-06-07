
import { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import MainApp from '../components/MainApp';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <WelcomeScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <MainApp />;
};

export default Index;
