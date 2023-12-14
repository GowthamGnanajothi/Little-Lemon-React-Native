import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileMenuIcon from "../components/ProfileMenuIcon";
import ProfileScreen from "../screens/ProfileScreen";
import HeaderLogoTitle from "../components/HeaderLogoTitle";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{headerTitleAlign: 'center'}}>
        {/* Set up stack navigation to move between welcome screen and subscribe screen here */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: () => <HeaderLogoTitle/> }} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            headerTitle: () => <HeaderLogoTitle/>,
            headerRight: () => (
                <ProfileMenuIcon></ProfileMenuIcon>
            ), }} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerTitle: () => <HeaderLogoTitle/> }} />
      </Stack.Navigator>
    );
  };
  
  export default RootNavigator;