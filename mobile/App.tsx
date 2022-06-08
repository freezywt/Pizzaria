import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'

import { AuthProvider } from './src/contexts/AuthContext'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#fff' translucent={false} style="dark" />
      <AuthProvider>
        <Routes />
      </AuthProvider>

    </NavigationContainer>
  );
}