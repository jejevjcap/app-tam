import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useCallback, useReducer } from 'react'
import { COLORS, SIZES, FONTS, icons, images } from '../constants'
import Button from '../components/Button'

import { reducer } from '../utils/reducers/formReducers'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native-virtualized-view'
import Header from '../components/Header'
import GlobalSettingsItem from '../components/GlobalSettingsItem'
import { useTheme } from '../theme/ThemeProvider'
import Input from '../components/Input'

const isTestMode = true

const initialState = {
    inputValues: {
        fullName: isTestMode ? 'John Doe' : '',
        email: isTestMode ? 'example@gmail.com' : '',
        nickname: isTestMode ? '' : '',
        phoneNumber: '',
    },
    inputValidities: {
        fullName: false,
        email: false,
        nickname: false,
        phoneNumber: false,
    },
    formIsValid: false,
}

const SettingsEndpoint = () => {
    const [isGeneralNotificationsEnabled, setIsGeneralNotificationsEnabled] =
        useState(true)

    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const { colors, dark } = useTheme()

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    return (
        <SafeAreaView
            style={[
                styles.area,
                { backgroundColor: dark ? COLORS.dark1 : COLORS.white },
            ]}
        >
            <View
                style={[
                    styles.container,
                    { backgroundColor: dark ? COLORS.dark1 : COLORS.white },
                ]}
            >
                <StatusBar hidden />
                <Header title="Konfigurasi URL" />
                <ScrollView
                    // style={styles.settingsContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <Text>URL Lokal</Text>
                        <Input
                            id="urlLocal"
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['fullName']}
                            placeholder="http://urllocal-tam.com"
                            placeholderTextColor={
                                dark ? COLORS.grayTie : COLORS.black
                            }
                        />
                    </View>

                    <View>
                        <Text>URL Training</Text>
                        <Input
                            id="urlTraining"
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['fullName']}
                            placeholder="https://urltraining-tam.com"
                            placeholderTextColor={
                                dark ? COLORS.grayTie : COLORS.black
                            }
                        />
                    </View>

                    <View>
                        <Button
                            title="Update"
                            filled
                            style={styles.continueButton}
                            onPress={() => navigation.navigate('Profile')}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.white,
    },
    settingsContainer: {
        marginVertical: 16,
    },

    inputContainer: {
        flexDirection: 'row',
        borderColor: COLORS.greyscale500,
        borderWidth: 0.4,
        borderRadius: 6,
        height: 52,
        width: SIZES.width - 32,
        alignItems: 'center',
        marginVertical: 16,
        backgroundColor: COLORS.greyscale500,
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        marginVertical: 10,
        height: 40,
        fontSize: 14,
        color: '#111',
    },
    continueButton: {
        width: SIZES.width - 32,
        borderRadius: 32,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        marginTop: 10,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 32,
        right: 16,
        left: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: SIZES.width - 32,
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        borderColor: COLORS.greyscale500,
        borderWidth: 0.4,
        borderRadius: 6,
        height: 52,
        width: SIZES.width - 32,
        alignItems: 'center',
        marginVertical: 16,
        backgroundColor: COLORS.greyscale500,
    },
})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingHorizontal: 10,
        borderRadius: 4,
        color: COLORS.greyscale600,
        paddingRight: 30,
        height: 58,
        width: SIZES.width - 32,
        alignItems: 'center',
        backgroundColor: COLORS.greyscale500,
        borderRadius: 16,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        borderRadius: 8,
        color: COLORS.greyscale600,
        paddingRight: 30,
        height: 58,
        width: SIZES.width - 32,
        alignItems: 'center',
        backgroundColor: COLORS.greyscale500,
        borderRadius: 16,
    },
})
export default SettingsEndpoint
