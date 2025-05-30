import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { useCallback, useEffect } from 'react'
import { FONTS } from './constants/fonts'
import AppNavigation from './navigations/AppNavigation'
import { LogBox } from 'react-native'
import { ThemeProvider } from './theme/ThemeProvider'
import * as ScreenOrientation from 'expo-screen-orientation'
import { CopilotProvider } from 'react-native-copilot' // Import CopilotProvider
// import { worklet, Worklets } from 'react-native-worklets-core'

// import React, { useEffect } from 'react'

//Ignore all log notifications
LogBox.ignoreAllLogs()

SplashScreen.preventAutoHideAsync()

export default function App() {
    const [fontsLoaded] = useFonts(FONTS)

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    return (
        <CopilotProvider>
            <ThemeProvider>
                <SafeAreaProvider onLayout={onLayoutRootView}>
                    <AppNavigation />
                </SafeAreaProvider>
            </ThemeProvider>
        </CopilotProvider>
    )
}
