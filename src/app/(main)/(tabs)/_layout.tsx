import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabLayout = () => {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown:false, 
        tabBarActiveTintColor: "#2A2A2A",
        tabBarInactiveTintColor: "#FAD4D4",
        tabBarStyle: {
          shadowColor: "transparent",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderTopWidth: 0,
          height: 65,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen 
        name='index'
        options={{
          title: 'Exercises',
          tabBarIcon: ({ focused }) => (
            <FontAwesome6 name="dumbbell" size={26} color={focused ? "#2A2A2A" : "#FAD4D4"} />
          )
        }}
      />

      <Tabs.Screen 
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="user" size={26} color={focused ? "#2A2A2A" : "#FAD4D4"} />
          )
        }}
      />
    </Tabs>
  )
}

export default TabLayout;