import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import SectionSubItem from '../components/SectionSubItem'
import CourseSectionCard from '../components/CourseSectionCard'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../theme/ThemeProvider'

const DetailInspection = () => {
    const navigation = useNavigation()
    const { colors, dark } = useTheme()

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.area, { backgroundColor: colors.background }]}
        >
            <View style={styles.subHeaderContainer}>
                <Text
                    style={[
                        styles.subHeaderLeft,
                        {
                            color: dark ? COLORS.white : COLORS.greyscale900,
                        },
                    ]}
                >
                    Detail Pemeriksaan
                </Text>
            </View>
            <View
                style={[
                    styles.contentContainer,
                    {
                        backgroundColor: dark
                            ? COLORS.dark1
                            : COLORS.background,
                    },
                ]}
            >
                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
                <Text style={[styles.duration]}>Value</Text>

                <Text style={[styles.title]}>Content</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    subHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
    },
    subHeaderLeft: {
        fontSize: 18,
        fontFamily: 'bold',
        color: COLORS.black,
        marginRight: 16,
    },
    subHeaderRight: {
        fontSize: 14,
        fontFamily: 'bold',
        color: COLORS.primary,
    },
    contentContainer: {
        backgroundColor: COLORS.tertiaryWhite,
        flex: 1,
    },

    title: {
        fontSize: 14,
        fontFamily: 'bold',
        color: COLORS.black,
        marginBottom: 4,
    },
    duration: {
        fontSize: 12,
        color: 'gray',
    },
})

export default DetailInspection
