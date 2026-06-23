import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/HomeScreen';
import { CharactersScreen } from '../screens/CharactersScreen';
import { CharacterDetailScreen } from '../screens/CharacterDetailScreen';
import { MomentsScreen } from '../screens/MomentsScreen';
import { MomentDetailScreen } from '../screens/MomentDetailScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { GameScreen } from '../screens/GameScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { DrawerContent } from '../components/DrawerContent';
import {
  DrawerParamList,
  CharactersStackParamList,
  MomentsStackParamList,
  RootStackParamList,
} from './types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { SplashScreen } from '../screens/SplashScreen';

const RootStack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const CharactersStack = createStackNavigator<CharactersStackParamList>();
const MomentsStack = createStackNavigator<MomentsStackParamList>();

const defaultHeaderStyle = {
  backgroundColor: Colors.backgroundMid,
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 1,
  borderBottomColor: Colors.borderDim,
};

const defaultTitleStyle = {
  ...Typography.navLabel,
  color: Colors.gold,
  letterSpacing: 3,
};

function CharactersNavigator() {
  return (
    <CharactersStack.Navigator
      screenOptions={{
        headerStyle: defaultHeaderStyle,
        headerTitleStyle: defaultTitleStyle,
        headerTintColor: Colors.gold,
        headerBackTitle: '',
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      {/* CharactersList has its own custom header with hamburger – hide native header */}
      <CharactersStack.Screen
        name="CharactersList"
        component={CharactersScreen}
        options={{ headerShown: false }}
      />
      <CharactersStack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{ headerShown: false }}
      />
    </CharactersStack.Navigator>
  );
}

function MomentsNavigator() {
  return (
    <MomentsStack.Navigator
      screenOptions={{
        headerStyle: defaultHeaderStyle,
        headerTitleStyle: defaultTitleStyle,
        headerTintColor: Colors.gold,
        headerBackTitle: '',
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      {/* MomentsList has its own custom header with hamburger – hide native header */}
      <MomentsStack.Screen
        name="MomentsList"
        component={MomentsScreen}
        options={{ headerShown: false }}
      />
      <MomentsStack.Screen
        name="MomentDetail"
        component={MomentDetailScreen}
        options={{ headerShown: false }}
      />
    </MomentsStack.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: defaultHeaderStyle,
        headerTitleStyle: defaultTitleStyle,
        headerTintColor: Colors.gold,
        drawerStyle: { backgroundColor: Colors.drawerBg, width: 280 },
        overlayColor: 'rgba(0,0,0,0.7)',
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'GAME OF THRONES', headerShown: false }} />
      <Drawer.Screen name="Characters" component={CharactersNavigator} options={{ title: 'PERSONAJES', headerShown: false }} />
      <Drawer.Screen name="Moments" component={MomentsNavigator} options={{ title: 'MOMENTOS', headerShown: false }} />
      <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'ACERCA DE', headerStyle: defaultHeaderStyle, headerTitleStyle: defaultTitleStyle }} />
      <Drawer.Screen name="Game" component={GameScreen} options={{ title: 'JUEGA CONMIGO', headerStyle: defaultHeaderStyle, headerTitleStyle: defaultTitleStyle }} />
      <Drawer.Screen name="Contact" component={ContactScreen} options={{ title: 'CONTRÁTAME', headerStyle: defaultHeaderStyle, headerTitleStyle: defaultTitleStyle }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'AJUSTES', headerStyle: defaultHeaderStyle, headerTitleStyle: defaultTitleStyle }} />
    </Drawer.Navigator>
  );
}

export function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="Main" component={MainDrawer} />
    </RootStack.Navigator>
  );
}
