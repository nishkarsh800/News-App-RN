import { TabBar } from '@/components/TabBar'
import { Tabs } from 'expo-router'
import React from 'react'

const TabLayout = () => {
  return (
    <Tabs tabBar=
    {(props) => <TabBar {...props} />} 
    screenOptions = {{headerShown: false}} >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  )
}

export default TabLayout