import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const AuthScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' />
    </Stack>
  )
}

export default AuthScreenLayout;

const styles = StyleSheet.create({})