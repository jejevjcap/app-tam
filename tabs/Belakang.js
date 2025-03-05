import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
} from 'react-native'
import React from 'react'
import { messsagesData } from '../data'
import { COLORS, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../theme/ThemeProvider'
import { Dimensions } from 'react-native'
// import { Image } from 'expo-image'

import Icon from 'react-native-vector-icons/MaterialIcons' // Import Icon

const Belakang = () => {
    const navigation = useNavigation()
    const { colors, dark } = useTheme()
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            onPress={() =>
                navigation.navigate('Chat', {
                    userName: item.fullName,
                })
            }
            style={[
                styles.userContainer,
                {
                    borderBottomWidth: dark ? 0 : 1,
                },
                index % 2 !== 0
                    ? {
                          backgroundColor: dark
                              ? COLORS.dark1
                              : COLORS.tertiaryWhite,
                          borderBottomWidth: dark ? 0 : 1,
                          borderTopWidth: dark ? 0 : 0,
                      }
                    : null,
            ]}
        >
            <View style={styles.userImageContainer}>
                {item.isOnline && item.isOnline === true && (
                    <View style={styles.onlineIndicator} />
                )}

                <Image
                    source={item.userImg}
                    resizeMode="contain"
                    style={styles.userImage}
                />
            </View>
            <View style={{ flexDirection: 'row', width: SIZES.width - 104 }}>
                <View style={[styles.userInfoContainer]}>
                    <Text
                        style={[
                            styles.userName,
                            {
                                color: dark ? COLORS.white : COLORS.black,
                            },
                        ]}
                    >
                        {item.fullName}
                    </Text>
                    <Text style={styles.lastSeen}>{item.lastMessage}</Text>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        right: 4,
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={[
                            styles.lastMessageTime,
                            {
                                color: dark ? COLORS.white : COLORS.black,
                            },
                        ]}
                    >
                        {item.lastMessageTime}
                    </Text>
                    <View>
                        {item.messageInQueue > 0 && (
                            <TouchableOpacity
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 999,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: item.messageInQueue
                                        ? COLORS.primary
                                        : 'transparent',
                                    marginTop: 12,
                                }}
                            >
                                <Text style={[styles.messageInQueue]}>
                                    {`${item.messageInQueue}`}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: dark ? COLORS.dark1 : COLORS.white,
                },
            ]}
        >
            {/* Title Outside the View */}
            <Text
                style={[
                    styles.title,
                    { color: dark ? COLORS.white : COLORS.black },
                ]}
            >
                Tampak Belakang
            </Text>
            <View
                style={[
                    styles.contentContainer,
                    {
                        backgroundColor: dark
                            ? COLORS.dark1
                            : COLORS.tertiaryWhite,
                    },
                ]}
            >
                <Image
                    source={{
                        uri: 'https://static.thenounproject.com/png/1156518-200.png',
                    }}
                    resizeMode="fill"
                    style={styles.flatListContainer}
                />

                {/* Two Buttons Section with Icons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: COLORS.primary },
                        ]}
                        onPress={() => console.log('Button 1 Pressed')}
                    >
                        <Icon
                            name="camera"
                            size={20}
                            color={COLORS.white}
                            style={styles.icon}
                        />
                        <Text style={styles.buttonText}>Foto</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: COLORS.warning },
                        ]}
                        onPress={() => console.log('Button 1 Pressed')}
                    >
                        <Icon
                            name="crop"
                            size={20}
                            color={COLORS.white}
                            style={styles.icon}
                        />
                        <Text style={styles.buttonText}>Crop</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: COLORS.success },
                        ]}
                        onPress={() => console.log('Button 1 Pressed')}
                    >
                        <Icon
                            name="contrast"
                            size={20}
                            color={COLORS.white}
                            style={styles.icon}
                        />
                        <Text style={styles.buttonText}>Adjusment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 16,
        marginTop: 10,
        height: 300,
        borderRadius: 10,
    },

    container: {
        flex: 1,
        paddingTop: 20, // Space from the top for the title
        paddingHorizontal: 16, // To match padding for buttons
        backgroundColor: COLORS.white,
    },

    title: {
        fontSize: 22, // Title font size
        fontFamily: 'bold', // Bold font for the title
        marginBottom: 20, // Spacing between the title and buttons
        textAlign: 'center', // Center the title
        marginTop: 5,
    },
    iconBtnContainer: {
        height: 40,
        width: 40,
        borderRadius: 999,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notiContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 16,
        width: 16,
        borderRadius: 999,
        backgroundColor: COLORS.red,
        position: 'absolute',
        top: 1,
        right: 1,
        zIndex: 999,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    notiText: {
        fontSize: 10,
        color: COLORS.white,
        fontFamily: 'medium',
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: 'bold',
        color: COLORS.black,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        height: 50,
        marginVertical: 22,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    searchInput: {
        width: '100%',
        height: '100%',
        marginHorizontal: 12,
    },
    flatListContainer: {
        paddingBottom: 100,
        height: 290,
    },
    userContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLORS.secondaryWhite,
        borderBottomWidth: 1,
    },
    oddBackground: {
        backgroundColor: COLORS.tertiaryWhite,
    },
    userImageContainer: {
        paddingVertical: 15,
        marginRight: 22,
    },
    onlineIndicator: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.white,
        borderWidth: 2,
        position: 'absolute',
        top: 14,
        right: 2,
        zIndex: 1000,
    },
    userImage: {
        height: 100,
        width: 100,
        borderRadius: 25,
    },
    userInfoContainer: {
        flexDirection: 'column',
    },
    userName: {
        fontSize: 14,
        color: COLORS.black,
        fontFamily: 'bold',
        marginBottom: 4,
    },
    lastSeen: {
        fontSize: 14,
        color: 'gray',
    },
    lastMessageTime: {
        fontSize: 12,
        fontFamily: 'regular',
    },
    messageInQueue: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.white,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'bold',
    },
    contentContainer: {
        padding: 16,
        marginTop: 10,
        height: 300,
        borderRadius: 10,
    },
    flatListContainer: {
        paddingBottom: 100,
        height: 290,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row', // Make sure the text and icon are in a row
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'bold',
        marginLeft: 8, // Space between icon and text
    },
})

export default Belakang
