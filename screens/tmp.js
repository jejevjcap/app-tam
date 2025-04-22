import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Switch,
    Button,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES, icons, images } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RNCamera } from 'react-native-camera'
import { useCameraPermission } from 'react-native-vision-camera'
import { PermissionsAndroid, Platform } from 'react-native'
import { useTheme } from '../theme/ThemeProvider'

const CameraSwitcher2 = () => {
    const { colors, dark } = useTheme()
    const [isFrontCamera, setIsFrontCamera] = useState(false)
    const [hasPermission, setHasPermission] = useState(null)

    useEffect(() => {
        requestCameraPermission()
    }, [])

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            )
            setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED)
        } else if (Platform.OS === 'ios') {
            const status = await RNCamera.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }
    }

    const cameraType = isFrontCamera
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back

    const toggleFlipCamera = () => {
        setIsFrontCamera(!isFrontCamera)
    }

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        style={styles.headerLogo}
                    />
                    <Text
                        style={[
                            styles.headerTitle,
                            {
                                color: dark
                                    ? COLORS.white
                                    : COLORS.greyscale900,
                            },
                        ]}
                    >
                        Boroscope
                    </Text>
                </View>
            </View>
        )
    }

    const renderChoices = () => {
        return (
            <TouchableOpacity style={styles.settingsItemContainer}>
                <View style={styles.leftContainer}>
                    <Image
                        source={icons.videoCamera2}
                        resizeMode="contain"
                        style={[
                            styles.settingsIcon,
                            {
                                tintColor: dark
                                    ? COLORS.white
                                    : COLORS.greyscale900,
                            },
                        ]}
                    />
                    <Text
                        style={[
                            styles.settingsName,
                            {
                                color: dark
                                    ? COLORS.white
                                    : COLORS.greyscale900,
                            },
                        ]}
                    >
                        Boroscope
                    </Text>
                </View>
                <View style={styles.rightContainer}>
                    <Switch
                        value={isFrontCamera}
                        onValueChange={toggleFlipCamera}
                        thumbColor={isFrontCamera ? '#fff' : COLORS.white}
                        trackColor={{
                            false: '#EEEEEE',
                            true: COLORS.primary,
                        }}
                        ios_backgroundColor={COLORS.white}
                        style={styles.switch}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    const renderCamera = () => {
        if (hasPermission === false) {
            return (
                <View style={styles.container}>
                    <Text style={styles.message}>
                        We need your permission to show the camera
                    </Text>
                    <Button
                        onPress={requestCameraPermission}
                        title="Grant Permission"
                    />
                </View>
            )
        }

        return (
            <View
                style={[
                    styles.container_cam,
                    { backgroundColor: colors.background },
                ]}
            >
                <RNCamera
                    style={StyleSheet.absoluteFill}
                    type={cameraType}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    onBarCodeRead={(e) => {
                        console.log(e.data) // Handle QR code or barcode scan
                    }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView
            style={[styles.area, { backgroundColor: colors.background }]}
        >
            <View
                style={[
                    styles.container,
                    { backgroundColor: colors.background },
                ]}
            >
                {renderHeader()}
                {renderChoices()}
                {renderCamera()}
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
        // flex: 1,
        // backgroundColor: COLORS.white,
        padding: 16,
    },

    container_cam: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.width - 32,
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLogo: {
        height: 36,
        width: 36,
        // tintColor: COLORS.primary
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'bold',
        color: COLORS.black,
        marginLeft: 12,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black,
    },

    camera: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    moreCircleIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black,
        marginLeft: 12,
    },
    switch: {
        marginLeft: 8,
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Adjust the size of the switch
    },
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
        marginBottom: 32,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        height: 32,
        width: 32,
        //tintColor: COLORS.primary
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: 'bold',
        color: COLORS.greyscale900,
        marginLeft: 12,
    },
    headerIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.greyscale900,
    },
    profileContainer: {
        alignItems: 'center',
        borderBottomColor: COLORS.grayscale400,
        borderBottomWidth: 0.4,
        paddingVertical: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 999,
    },
    picContainer: {
        width: 20,
        height: 20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        position: 'absolute',
        right: 0,
        bottom: 12,
    },
    title: {
        fontSize: 18,
        fontFamily: 'bold',
        color: COLORS.greyscale900,
        marginTop: 12,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.greyscale900,
        fontFamily: 'medium',
        marginTop: 4,
    },
    settingsContainer: {
        marginVertical: 12,
    },
    settingsItemContainer: {
        width: SIZES.width - 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.greyscale900,
    },
    settingsName: {
        fontSize: 18,
        fontFamily: 'semiBold',
        color: COLORS.greyscale900,
        marginLeft: 12,
    },
    settingsArrowRight: {
        width: 24,
        height: 24,
        tintColor: COLORS.greyscale900,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightLanguage: {
        fontSize: 18,
        fontFamily: 'semiBold',
        color: COLORS.greyscale900,
        marginRight: 8,
    },
    switch: {
        marginLeft: 8,
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Adjust the size of the switch
    },
    logoutContainer: {
        width: SIZES.width - 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
    },
    logoutLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.greyscale900,
    },
    logoutName: {
        fontSize: 18,
        fontFamily: 'semiBold',
        color: COLORS.greyscale900,
        marginLeft: 12,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
        paddingHorizontal: 16,
    },
    cancelButton: {
        width: (SIZES.width - 32) / 2 - 8,
        backgroundColor: COLORS.tansparentPrimary,
        borderRadius: 32,
    },
    logoutButton: {
        width: (SIZES.width - 32) / 2 - 8,
        backgroundColor: COLORS.primary,
        borderRadius: 32,
    },
    bottomTitle: {
        fontSize: 24,
        fontFamily: 'semiBold',
        color: 'red',
        textAlign: 'center',
        marginTop: 12,
    },
    bottomSubtitle: {
        fontSize: 20,
        fontFamily: 'semiBold',
        color: COLORS.greyscale900,
        textAlign: 'center',
        marginVertical: 36,
    },
})

export default CameraSwitcher2
