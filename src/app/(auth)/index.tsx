import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomText from '@/src/utils/CustomText'
import { useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

const AuthIndex = () => {
  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('myapp://oauth-callback', { scheme: 'myapp' }),
      })

      // If sign-in is successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        
      } else {
        console.error('No session created. Check the flow steps.');
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-backgroundColor justify-center items-center'>
      <CustomText style={{ fontFamily: "Montserrat-ExtraBold", marginBottom: 20, fontSize: 26 }}> My Fitness </CustomText>
      <TouchableOpacity
        onPress={onPress}
        className='bg-primaryAccentColor p-3 rounded-lg'
      >
        <Text className='font-semibold'> Sign in with Google </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AuthIndex;