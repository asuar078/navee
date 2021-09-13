import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { IndexExampleContainer } from '@/Containers'
import { IndexContainer } from '@/Containers'

const Tab = createStackNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={IndexContainer} />
      <Tab.Screen name="Example" component={IndexExampleContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator
