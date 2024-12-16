import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'

const profile = () => {
  const { getToken, userId } = useAuth();
  
  return (
    <View>
      <Text>profile</Text>
    </View>
  )
}

export default profile;