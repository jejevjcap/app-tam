import { View, Platform, Image, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, FONTS, icons } from '../constants'
import { Home, Inbox, MyCourse, Profile, Transactions } from '../screens'
import { useTheme } from '../theme/ThemeProvider'

const Tab = createBottomTabNavigator()

const BottomTabNavigation = () => {
    const { dark } = useTheme()

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    justifyContent: 'center',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    elevation: 0,
                    height: Platform.OS === 'ios' ? 90 : 65,
                    backgroundColor: dark ? COLORS.dark1 : COLORS.white,
                    borderTopColor: 'transparent',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={
                                        focused
                                            ? icons.home
                                            : icons.home2Outline
                                    }
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : dark
                                              ? COLORS.gray3
                                              : COLORS.gray3,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        color: focused
                                            ? COLORS.primary
                                            : dark
                                              ? COLORS.gray3
                                              : COLORS.gray3,
                                    }}
                                >
                                    Home
                                </Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="MyCourse"
                component={MyCourse}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={
                                        focused
                                            ? icons.videoCamera
                                            : icons.videoCameraOutline
                                    }
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : dark
                                              ? COLORS.gray3
                                              : COLORS.gray3,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        color: focused
                                            ? COLORS.primary
                                            : dark
                                              ? COLORS.gray3
                                              : COLORS.gray3,
                                    }}
                                >
                                    Boroscope
                                </Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Inbox"
                component={Inbox}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={focused ? icons.plus : icons.plus}
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : dark
                                              ? COLORS.gray3
                                              : COLORS.gray3,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        color: focused
                                            ? COLORS.primary
                                            : dark
                                              ? COLORS.gray3
                                              : COLORS.gray3,
                                    }}
                                >
                                    Periksa
                                </Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Transactions"
                component={Transactions}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={
                                        focused
                                            ? icons.infoCircle
                                            : icons.infoCircle
                                    }
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : dark
                                              ? COLORS.gray3
                                              : COLORS.gray3,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        color: focused
                                            ? COLORS.primary
                                            : dark
                                              ? COLORS.gray3
                                              : COLORS.gray3,
                                    }}
                                >
                                    Petunjuk
                                </Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={
                                        focused
                                            ? icons.settings
                                            : icons.setting2Outline
                                    }
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : dark
                                              ? COLORS.gray3
                                              : COLORS.gray3,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        color: focused
                                            ? COLORS.primary
                                            : dark
                                              ? COLORS.gray3
                                              : COLORS.gray3,
                                    }}
                                >
                                    Pengaturan
                                </Text>
                            </View>
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation
