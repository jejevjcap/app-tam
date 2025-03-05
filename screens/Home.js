import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import { COLORS, SIZES, icons, images } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import SectionHeader from '../components/SectionHeader'
import { allCourses, allMentors, category, ratings } from '../data'
import CourseCard from '../components/CourseCard'
import MentorCard from '../components/MentorCard'
import NotFoundCard from '../components/NotFoundCard'
import { useTheme } from '../theme/ThemeProvider'
import { FontAwesome } from '@expo/vector-icons'
import { banners, mostHistoryList, topMentors } from '../data'
import { useCopilot, CopilotStep, walkthroughable } from 'react-native-copilot'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Button from '../components/Button'

const CopilotText = walkthroughable(Text)
const CopilotImage = walkthroughable(View)
const CopilotLogout = walkthroughable(View)
const CopilotHistory = walkthroughable(View)
const CopilotFilter = walkthroughable(TouchableOpacity)
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
const Home = ({ navigation }) => {
    const refRBSheet = useRef()
    const [currentIndex, setCurrentIndex] = useState(0)

    const { dark, colors } = useTheme()
    const [selectedCategories, setSelectedCategories] = useState(['1'])
    const [selectedRating, setSelectedRating] = useState(['1'])
    const [priceRange, setPriceRange] = useState([0, 100]) // Initial price range

    const handleSliderChange = (values) => {
        setPriceRange(values)
    }

    // const { start } = useCopilot()
    const { start, next, previous } = useCopilot() // Hook to control the tour steps

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

    const renderContent = () => {
        const [selectedTab, setSelectedTab] = useState('Courses')
        const [searchQuery, setSearchQuery] = useState('')
        const [filteredCourses, setFilteredCourses] = useState(allCourses)
        const [filteredMentors, setFilteredMentors] = useState(allMentors)
        const [resultsCount, setResultsCount] = useState(0)

        useEffect(() => {
            handleSearch()
        }, [searchQuery, selectedTab])

        const handleSearch = () => {
            if (selectedTab === 'Courses') {
                const courses = allCourses.filter((course) =>
                    course.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
                setFilteredCourses(courses)
                setResultsCount(courses.length)
            } else if (selectedTab === 'Mentors') {
                const mentors = allMentors.filter((mentor) =>
                    mentor.fullName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
                setFilteredMentors(mentors)
                setResultsCount(mentors.length)
            }
        }

        return (
            <View>
                {/* Search Bar */}
                <View
                    onPress={() => console.log('Search')}
                    style={[
                        styles.searchBarContainer,
                        {
                            backgroundColor: dark
                                ? COLORS.dark2
                                : COLORS.secondaryWhite,
                        },
                    ]}
                >
                    <TouchableOpacity onPress={handleSearch}>
                        <Image
                            source={icons.search2}
                            resizeMode="contain"
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor={COLORS.gray}
                        style={[
                            styles.searchInput,
                            {
                                color: dark
                                    ? COLORS.white
                                    : COLORS.greyscale900,
                            },
                        ]}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                    <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                        <Image
                            source={icons.filter}
                            resizeMode="contain"
                            style={styles.filterIcon}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Tab bar container */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[
                                styles.tabBtn,
                                selectedTab === 'Courses' && styles.selectedTab,
                            ]}
                            onPress={() => {
                                setSelectedTab('Courses')
                                setSearchQuery('') // Clear search query when changing tab
                            }}
                        >
                            <Text
                                style={[
                                    styles.tabBtnText,
                                    selectedTab === 'Courses' &&
                                        styles.selectedTabText,
                                ]}
                            >
                                Courses
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tabBtn,
                                selectedTab === 'Mentors' && styles.selectedTab,
                            ]}
                            onPress={() => {
                                setSelectedTab('Mentors')
                                setSearchQuery('') // Clear search query when changing tab
                            }}
                        >
                            <Text
                                style={[
                                    styles.tabBtnText,
                                    selectedTab === 'Mentors' &&
                                        styles.selectedTabText,
                                ]}
                            >
                                Mentors
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Results container  */}
                    <View>
                        {searchQuery && (
                            <View style={styles.resultContainer}>
                                <View style={styles.resultLeftView}>
                                    <Text
                                        style={[
                                            styles.subtitle,
                                            {
                                                color: dark
                                                    ? COLORS.white
                                                    : COLORS.greyscale900,
                                            },
                                        ]}
                                    >
                                        Results for "
                                    </Text>
                                    <Text
                                        style={[
                                            styles.subtitle,
                                            { color: COLORS.primary },
                                        ]}
                                    >
                                        {searchQuery}
                                    </Text>
                                    <Text style={styles.subtitle}>"</Text>
                                </View>
                                <Text style={styles.subResult}>
                                    {resultsCount} found
                                </Text>
                            </View>
                        )}

                        {/* Courses result list */}
                        <View style={{ marginVertical: 16 }}>
                            {resultsCount && resultsCount > 0 ? (
                                <FlatList
                                    data={
                                        selectedTab === 'Courses'
                                            ? filteredCourses
                                            : filteredMentors
                                    }
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => {
                                        return selectedTab === 'Courses' ? (
                                            <CourseCard
                                                name={item.name}
                                                image={item.image}
                                                category={item.category}
                                                price={item.price}
                                                isOnDiscount={item.isOnDiscount}
                                                oldPrice={item.oldPrice}
                                                rating={item.rating}
                                                numStudents={item.numStudents}
                                                onPress={() =>
                                                    console.log('Course Card')
                                                }
                                                categoryId={item.categoryId}
                                            />
                                        ) : (
                                            <MentorCard
                                                avatar={item.avatar}
                                                fullName={item.fullName}
                                                position={item.position}
                                                onPress={() =>
                                                    navigation.navigate('Inbox')
                                                }
                                            />
                                        )
                                    }}
                                />
                            ) : (
                                <NotFoundCard />
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    const renderBannerItem = ({ item }) => (
        <View style={styles.bannerContainer}>
            <View style={styles.bannerTopContainer}>
                <View>
                    <Text style={styles.bannerDicount}>
                        {item.discount} OFF
                    </Text>
                    <Text style={styles.bannerDiscountName}>
                        {item.discountName}
                    </Text>
                </View>
                <Text style={styles.bannerDiscountNum}>{item.discount}</Text>
            </View>
            <View style={styles.bannerBottomContainer}>
                <Text style={styles.bannerBottomTitle}>{item.bottomTitle}</Text>
                <Text style={styles.bannerBottomSubtitle}>
                    {item.bottomSubtitle}
                </Text>
            </View>
        </View>
    )

    const keyExtractor = (item) => item.id.toString()

    const handleEndReached = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }

    const renderDot = (index) => {
        return (
            <View
                style={[
                    styles.dot,
                    index === currentIndex ? styles.activeDot : null,
                ]}
                key={index}
            />
        )
    }

    /**
     * render header
     */
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                {/* Tour Step 1 */}
                <CopilotStep
                    text="Pada bagian ini untuk mengetahui akun siapa yang sedang berada dalam aplikasi!"
                    order={1}
                    name="hello"
                >
                    <CopilotImage>
                        <View style={styles.viewLeft}>
                            <Image
                                source={images.user1}
                                resizeMode="contain"
                                style={styles.userIcon}
                            />
                            <View style={styles.viewNameContainer}>
                                <Text style={styles.greeeting}>
                                    Hi! Felan👋
                                </Text>
                                <Text
                                    style={[
                                        styles.title,
                                        {
                                            color: dark
                                                ? COLORS.white
                                                : COLORS.greyscale900,
                                        },
                                    ]}
                                >
                                    TAM - Jakarta
                                </Text>
                            </View>
                        </View>
                    </CopilotImage>
                </CopilotStep>

                <View style={styles.viewRight}>
                    <TouchableOpacity
                        onPress={() => start()} // Example navigation for info
                    >
                        <Image
                            source={icons.infoCircle}
                            resizeMode="contain"
                            style={[
                                styles.bellIcon,
                                {
                                    tintColor: dark
                                        ? COLORS.white
                                        : COLORS.greyscale900,
                                },
                            ]}
                        />
                    </TouchableOpacity>

                    {/* Tour Step 2 */}
                    <CopilotStep
                        text="Gunakan tombol ini untuk keluar dari aplikasi."
                        order={2}
                        name="hello2"
                    >
                        <CopilotLogout>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Image
                                    source={icons.logout}
                                    resizeMode="contain"
                                    style={[
                                        styles.bookmarkIcon,
                                        {
                                            tintColor: dark
                                                ? COLORS.white
                                                : COLORS.greyscale900,
                                        },
                                    ]}
                                />
                            </TouchableOpacity>
                        </CopilotLogout>
                    </CopilotStep>
                </View>
            </View>
        )
    }
    /**
     * Render search bar
     */
    const renderSearchBar = () => {
        // const handleInputFocus = () => {
        //     // Redirect to another screen
        //     navigation.navigate('Search')
        // }

        return (
            <TouchableOpacity
                // onPress={() => navigation.navigate('Search')}
                style={[
                    styles.searchBarContainer,
                    {
                        backgroundColor: dark
                            ? COLORS.dark2
                            : COLORS.secondaryWhite,
                    },
                ]}
            >
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    <Image
                        source={icons.search2}
                        resizeMode="contain"
                        style={styles.searchIcon}
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={COLORS.gray}
                    style={styles.searchInput}
                    // onFocus={handleInputFocus}
                />
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    <Image
                        source={icons.filter}
                        resizeMode="contain"
                        style={styles.filterIcon}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    /**
     * Render banner
     */
    const renderBanner = () => {
        return (
            <View style={styles.bannerItemContainer}>
                <FlatList
                    data={banners}
                    renderItem={renderBannerItem}
                    keyExtractor={keyExtractor}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollEnd={(event) => {
                        const newIndex = Math.round(
                            event.nativeEvent.contentOffset.x / SIZES.width
                        )
                        setCurrentIndex(newIndex)
                    }}
                />
                <View style={styles.dotContainer}>
                    {banners.map((_, index) => renderDot(index))}
                </View>
            </View>
        )
    }

    /**
     * Render Top Mentors
     */
    const renderTopMentors = () => {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                onPress={() => navigation.navigate('MentorProfile')}
                style={styles.mentorContainer}
                key={index}
            >
                <Image
                    source={item.avatar}
                    resizeMode="cover"
                    style={styles.userAvatar}
                />
                <Text
                    style={[
                        styles.firstName,
                        {
                            color: dark ? COLORS.white : COLORS.greyscale900,
                        },
                    ]}
                >
                    {item.firstName}
                </Text>
            </TouchableOpacity>
        )

        return (
            <View>
                <SectionHeader
                    title="Top Mentors"
                    // subtitle="See All"
                    onPress={() => navigation.navigate('TopMentors')}
                />
                <FlatList
                    data={topMentors}
                    keyExtractor={(item) => item.id}
                    horizontal
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }
    /**
     * Render popular courses
     */
    const renderHistory = () => {
        const [selectedCategories, setSelectedCategories] = useState(['1'])

        const filteredCourses = mostHistoryList
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

        // Toggle category selection
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

        return (
            <View>
                <SectionHeader
                    title="History"
                    onPress={() => navigation.navigate('MostPopularCourses')}
                />
                {/* <FlatList
                    data={category}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={renderCategoryItem}
                /> */}

                <FlatList
                    data={filteredCourses}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <CourseCard
                                name={item.name}
                                image={item.image}
                                category={item.status}
                                price={item.price}
                                // isOnDiscount={item.isOnDiscount}
                                // oldPrice={item.oldPrice}
                                // rating={item.rating}
                                // numStudents={item.numStudents}
                                onPress={() =>
                                    navigation.navigate('CourseDetailsMore')
                                }
                                categoryId={item.categoryId}
                            />
                        )
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

                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderSearchBar()}

                    {/*renderBanner()*/}
                    {/* {renderTopMentors()} */}
                    {renderHistory()}
                </ScrollView>

                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={480}
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
                            height: 480,
                            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                            alignItems: 'center',
                        },
                    }}
                >
                    <Text
                        style={[
                            styles.bottomTitle,
                            {
                                color: dark
                                    ? COLORS.white
                                    : COLORS.greyscale900,
                            },
                        ]}
                    >
                        Filter
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
                            Category
                        </Text>
                        <FlatList
                            data={category}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={renderCategoryItem}
                        />
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
                            Filter
                        </Text>
                        <MultiSlider
                            values={priceRange}
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
                            containerStyle={{ height: 40 }}
                            trackStyle={{ height: 3 }}
                        />
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
                            Rating
                        </Text>
                        <FlatList
                            data={ratings}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={renderRatingItem}
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
                            title="Filter"
                            filled
                            style={styles.logoutButton}
                            onPress={() => refRBSheet.current.close()}
                        />
                    </View>
                </RBSheet>
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
        backgroundColor: COLORS.white,
        padding: 16,
    },
    mb: {
        marginBottom: -80,
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 7,
        // width: SIZES.width - 32,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userIcon: {
        width: 48,
        height: 48,
        borderRadius: 32,
    },
    viewLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    greeeting: {
        fontSize: 12,
        fontFamily: 'regular',
        color: 'gray',
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontFamily: 'bold',
        color: COLORS.greyscale900,
    },
    viewNameContainer: {
        marginLeft: 12,
    },
    viewRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bellIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black,
        marginRight: 8,
    },
    bookmarkIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black,
    },
    searchBarContainer: {
        // width: SIZES.width - 32,
        backgroundColor: COLORS.secondaryWhite,
        padding: 16,
        borderRadius: 12,
        height: 52,
        marginVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.gray,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'regular',
        marginHorizontal: 8,
    },
    filterIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary,
    },
    bannerContainer: {
        // width: SIZES.width - 32,
        height: 154,
        paddingHorizontal: 28,
        paddingTop: 28,
        borderRadius: 32,
        backgroundColor: COLORS.primary,
    },
    bannerTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bannerDicount: {
        fontSize: 12,
        fontFamily: 'medium',
        color: COLORS.white,
        marginBottom: 4,
    },
    bannerDiscountName: {
        fontSize: 16,
        fontFamily: 'bold',
        color: COLORS.white,
    },
    bannerDiscountNum: {
        fontSize: 46,
        fontFamily: 'bold',
        color: COLORS.white,
    },
    bannerBottomContainer: {
        marginTop: 8,
    },
    bannerBottomTitle: {
        fontSize: 14,
        fontFamily: 'medium',
        color: COLORS.white,
    },
    bannerBottomSubtitle: {
        fontSize: 14,
        fontFamily: 'medium',
        color: COLORS.white,
        marginTop: 4,
    },
    mentorContainer: {
        marginRight: 10,
        alignItems: 'center',
    },
    userAvatar: {
        width: 64,
        height: 64,
        borderRadius: 999,
    },
    firstName: {
        fontSize: 16,
        fontFamily: 'semiBold',
        color: COLORS.dark2,
        marginTop: 6,
    },
    bannerItemContainer: {
        width: '100%',
        paddingBottom: 10,
        backgroundColor: COLORS.primary,
        height: 170,
        borderRadius: 32,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: COLORS.white,
    },
    filterIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary,
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.width - 32,
        justifyContent: 'space-between',
    },
    tabBtn: {
        width: (SIZES.width - 32) / 2 - 6,
        height: 42,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.4,
        borderColor: COLORS.primary,
        borderRadius: 32,
    },
    selectedTab: {
        width: (SIZES.width - 32) / 2 - 6,
        height: 42,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.4,
        borderColor: COLORS.primary,
        borderRadius: 32,
    },
    tabBtnText: {
        fontSize: 16,
        fontFamily: 'semiBold',
        color: COLORS.primary,
        textAlign: 'center',
    },
    selectedTabText: {
        fontSize: 16,
        fontFamily: 'semiBold',
        color: COLORS.white,
        textAlign: 'center',
    },
    resultContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width - 32,
        marginVertical: 16,
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
        marginTop: 12,
    },
    separateLine: {
        height: 0.4,
        width: SIZES.width - 32,
        backgroundColor: COLORS.greyscale300,
        marginVertical: 12,
    },
    sheetTitle: {
        fontSize: 18,
        fontFamily: 'semiBold',
        color: COLORS.black,
        marginVertical: 12,
    },
})

export default Home
