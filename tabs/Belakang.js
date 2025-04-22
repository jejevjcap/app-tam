import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
} from 'react-native'
// import React from 'react'

import { allCourses, allMentors, category } from '../data'
import React, { useEffect, useState, useRef } from 'react'

import { FontAwesome } from '@expo/vector-icons'
import RBSheet from 'react-native-raw-bottom-sheet'
import { messsagesData } from '../data'
import { COLORS, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../theme/ThemeProvider'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Icon from 'react-native-vector-icons/MaterialIcons' // Import Icon
import Button from '../components/Button'

// Handler slider
const CustomSliderHandle = ({ enabled, markerStyle }) => {
    return (
        <View
            style={[
                markerStyle,
                {
                    backgroundColor: enabled ? COLORS.primary : 'lightgray',
                    borderColor: 'white',
                    borderWidth: 2,
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                },
            ]}
        />
    )
}

const Belakang = () => {
    const refRBSheet = useRef()
    const navigation = useNavigation()
    const { colors, dark } = useTheme()

    const [selectedCategories, setSelectedCategories] = useState(['1'])
    const [selectedRating, setSelectedRating] = useState(['1'])
    const [priceRange, setPriceRange] = useState([0, 100]) // Initial price range
    const [saturationRange, setSaturationRange] = useState([0, 0]) // Initial price range
    const [contrastRange, setContrastRange] = useState([0, 0]) // Initial price range
    const [brightRange, setBrigtRange] = useState([0, 0]) // Initial price range
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

    const handleSliderChange = (values) => {
        setPriceRange(values)
    }
    const toggleCategory = (categoryId) => {
        const updatedCategories = [...selectedCategories]
        const index = updatedCategories.indexOf(categoryId)

        if (index === -1) {
            updatedCategories.push(categoryId)
        } else {
            updatedCategories.splice(index, 1)
        }

        setSelectedCategories(updatedCategories)
    }

    // toggle rating selection
    const toggleRating = (ratingId) => {
        const updatedRatings = [...selectedRating]
        const index = updatedRatings.indexOf(ratingId)

        if (index === -1) {
            updatedRatings.push(ratingId)
        } else {
            updatedRatings.splice(index, 1)
        }

        setSelectedRating(updatedRatings)
    }

    // Category item
    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: selectedCategories.includes(item.id)
                    ? COLORS.primary
                    : 'transparent',
                padding: 10,
                marginVertical: 5,
                borderColor: COLORS.primary,
                borderWidth: 1.3,
                borderRadius: 24,
                marginRight: 12,
            }}
            onPress={() => toggleCategory(item.id)}
        >
            <Text
                style={{
                    color: selectedCategories.includes(item.id)
                        ? COLORS.white
                        : COLORS.primary,
                }}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    )

    const renderRatingItem = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: selectedRating.includes(item.id)
                    ? COLORS.primary
                    : 'transparent',
                paddingHorizontal: 16,
                paddingVertical: 6,
                marginVertical: 5,
                borderColor: COLORS.primary,
                borderWidth: 1.3,
                borderRadius: 24,
                marginRight: 12,
                flexDirection: 'row',
                alignItems: 'center',
            }}
            onPress={() => toggleRating(item.id)}
        >
            <View style={{ marginRight: 6 }}>
                <FontAwesome
                    name="star"
                    size={14}
                    color={
                        selectedRating.includes(item.id)
                            ? COLORS.white
                            : COLORS.primary
                    }
                />
            </View>
            <Text
                style={{
                    color: selectedRating.includes(item.id)
                        ? COLORS.white
                        : COLORS.primary,
                }}
            >
                {item.title}
            </Text>
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
                        onPress={() => refRBSheet.current.open()}
                    >
                        <Icon
                            name="contrast"
                            size={20}
                            color={COLORS.white}
                            style={styles.icon}
                        />
                        <Text style={styles.buttonText}>Adjustment</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={200}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    },
                    draggableIcon: {
                        backgroundColor: dark ? COLORS.dark3 : '#000',
                    },
                    container: {
                        borderTopRightRadius: 32,
                        borderTopLeftRadius: 32,
                        height: 300,
                        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                        alignItems: 'center',
                    },
                }}
            >
                <Text
                    style={[
                        styles.bottomTitle,
                        {
                            color: dark ? COLORS.white : COLORS.greyscale900,
                        },
                    ]}
                >
                    Color Adjustment
                </Text>
                <View style={styles.separateLine} />
                <View style={{ width: SIZES.width - 32 }}>
                    <Text
                        style={[
                            styles.sheetTitle,
                            {
                                color: dark
                                    ? COLORS.white
                                    : COLORS.greyscale900,
                            },
                        ]}
                    >
                        Contrast
                    </Text>
                    <MultiSlider
                        values={contrastRange}
                        sliderLength={SIZES.width - 32}
                        onValuesChange={handleSliderChange}
                        min={0}
                        max={100}
                        step={1}
                        allowOverlap={false}
                        snapped
                        minMarkerOverlapDistance={40}
                        customMarker={CustomSliderHandle}
                        selectedStyle={{ backgroundColor: COLORS.primary }}
                        unselectedStyle={{ backgroundColor: 'lightgray' }}
                        containerStyle={{ height: 5 }}
                        trackStyle={{ height: 3 }}
                    />
                </View>
                <View style={{ width: SIZES.width - 32 }}>
                    <Text
                        style={[
                            styles.sheetTitle,
                            {
                                color: dark
                                    ? COLORS.white
                                    : COLORS.greyscale900,
                            },
                        ]}
                    >
                        Brightness
                    </Text>
                    <MultiSlider
                        values={brightRange}
                        sliderLength={SIZES.width - 32}
                        // onValuesChange={handleSliderChange}
                        min={0}
                        max={100}
                        step={1}
                        allowOverlap={false}
                        snapped
                        minMarkerOverlapDistance={40}
                        customMarker={CustomSliderHandle}
                        selectedStyle={{ backgroundColor: COLORS.primary }}
                        unselectedStyle={{ backgroundColor: 'lightgray' }}
                        containerStyle={{ height: 5 }}
                        trackStyle={{ height: 3 }}
                    />
                </View>
                <View style={{ width: SIZES.width - 32 }}>
                    <Text
                        style={[
                            styles.sheetTitle,
                            {
                                color: dark
                                    ? COLORS.white
                                    : COLORS.greyscale900,
                            },
                        ]}
                    >
                        Saturation
                    </Text>
                    <MultiSlider
                        values={saturationRange}
                        sliderLength={SIZES.width - 32}
                        // onValuesChange={handleSliderChange}
                        min={0}
                        max={100}
                        step={1}
                        allowOverlap={false}
                        snapped
                        minMarkerOverlapDistance={40}
                        customMarker={CustomSliderHandle}
                        selectedStyle={{ backgroundColor: COLORS.primary }}
                        unselectedStyle={{ backgroundColor: 'lightgray' }}
                        containerStyle={{ height: 5 }}
                        trackStyle={{ height: 3 }}
                    />
                </View>

                <View style={styles.separateLine} />

                <View style={styles.bottomContainer}>
                    <Button
                        title="Reset"
                        style={{
                            width: (SIZES.width - 32) / 2 - 8,
                            backgroundColor: dark
                                ? COLORS.dark3
                                : COLORS.tansparentPrimary,
                            borderRadius: 32,
                            borderColor: dark
                                ? COLORS.dark3
                                : COLORS.tansparentPrimary,
                        }}
                        textColor={dark ? COLORS.white : COLORS.primary}
                        onPress={() => refRBSheet.current.close()}
                    />
                    <Button
                        title="Apply"
                        filled
                        style={styles.logoutButton}
                        onPress={() => refRBSheet.current.close()}
                    />
                </View>
            </RBSheet>
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

    subtitle: {
        fontSize: 18,
        fontFamily: 'bold',
        color: COLORS.black,
    },
    subResult: {
        fontSize: 14,
        fontFamily: 'semiBold',
        color: COLORS.primary,
    },
    resultLeftView: {
        flexDirection: 'row',
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
        paddingHorizontal: 16,
        width: SIZES.width,
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
        color: COLORS.black,
        textAlign: 'center',
        marginTop: 5,
    },
    separateLine: {
        height: 0.4,
        width: SIZES.width - 32,
        backgroundColor: COLORS.greyscale300,
        marginVertical: 0,
    },
    sheetTitle: {
        fontSize: 18,
        fontFamily: 'semiBold',
        color: COLORS.black,
        marginVertical: 12,
    },
})

export default Belakang
