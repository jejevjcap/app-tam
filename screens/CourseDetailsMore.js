import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, icons, images } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { CourseAbout, CourseLessons, CourseReviews } from '../tabs'
import Button from '../components/Button'
import { useTheme } from '../theme/ThemeProvider'
import DetailInspection from '../tabs/DetailInspection'
import GeneratePDF from '../tabs/GeneratePDF'

const renderScene = SceneMap({
    first: DetailInspection,
    second: GeneratePDF,
    // third: CourseReviews,
})

const CourseDetailsMore = ({ navigation }) => {
    const [isBookmarked, setIsBookmarked] = useState(false)
    const layout = useWindowDimensions()
    const { colors, dark } = useTheme()

    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        { key: 'first', title: 'Details' },
        { key: 'second', title: 'Generate PDF' },
    ])

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: COLORS.primary,
            }}
            style={{
                backgroundColor: colors.background,
            }}
            renderLabel={({ route, focused }) => (
                <Text
                    style={[
                        {
                            color: focused ? COLORS.primary : 'gray',
                            fontSize: 16,
                            fontFamily: 'semiBold',
                        },
                    ]}
                >
                    {route.title}
                </Text>
            )}
        />
    )

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <StatusBar hidden />
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.headerContainer}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={styles.backIcon}
                />
            </TouchableOpacity>
            <Image
                source={images.course1}
                resizeMode="cover"
                style={styles.courseImage}
            />

            {/* course info */}
            <View style={styles.courseInfoContainer}>
                <View style={styles.titleContainer}>
                    <Text
                        style={[
                            styles.courseName,
                            {
                                color: dark
                                    ? COLORS.white
                                    : COLORS.greyscale900,
                            },
                        ]}
                    >
                        TRX ID - ABC 123
                    </Text>
                </View>
                {/* Reviews and rating container */}
                <View style={styles.ratingContainer}>
                    <TouchableOpacity style={styles.categoryContainer}>
                        <Text style={styles.categoryName}>Draft</Text>
                    </TouchableOpacity>
                </View>
                {/* Price container */}
            </View>

            <View style={styles.tabContainer}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    courseImage: {
        width: SIZES.width,
        height: SIZES.width * 0.625,
    },
    headerContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 999,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.white,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    courseName: {
        fontSize: 26,
        fontFamily: 'bold',
        color: COLORS.black,
    },
    courseInfoContainer: {
        padding: 16,
    },
    bookmarkIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    categoryContainer: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: COLORS.transparentTertiary,
    },
    categoryName: {
        fontSize: 12,
        fontFamily: 'medium',
        color: COLORS.primary,
    },
    starIcon: {
        width: 16,
        height: 16,
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 22,
    },
    starTitle: {
        fontSize: 14,
        fontFamily: 'medium',
        color: COLORS.black,
    },
    priceContainer: {
        marginVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 28,
        fontFamily: 'bold',
        color: COLORS.primary,
    },
    oldPrice: {
        fontSize: 18,
        fontFamily: 'bold',
        color: COLORS.gray,
        textDecorationLine: 'line-through',
        marginLeft: 10,
    },
    courseResumeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    courseViewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    courseViewIcon: {
        width: 16,
        height: 16,
        tintColor: COLORS.primary,
    },
    courseViewTitle: {
        fontSize: 16,
        fontFamily: 'regular',
        color: COLORS.black,
        marginLeft: 6,
    },
    separateLine: {
        width: SIZES.width,
        height: 0.4,
        backgroundColor: COLORS.gray,
        marginTop: 16,
    },
    tabContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        height: 96,
        width: SIZES.width,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    bottomBtn: {
        width: SIZES.width - 32,
    },
})

export default CourseDetailsMore
