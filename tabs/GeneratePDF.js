import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../theme/ThemeProvider'

const GeneratePDF = () => {
    const navigation = useNavigation()
    const { colors, dark } = useTheme()

    const handleGeneratePDF = () => {
        // Your logic to generate the PDF goes here
        console.log('PDF is being generated')
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.area, { backgroundColor: colors.background }]}
        >
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
                {/* Content goes here */}

                {/* Button to generate PDF */}
                <TouchableOpacity
                    style={[
                        styles.generateButton,
                        {
                            backgroundColor: dark
                                ? COLORS.primary
                                : COLORS.secondary,
                        },
                    ]}
                    onPress={handleGeneratePDF}
                >
                    <Text style={styles.buttonText}>Generate PDF</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        marginTop: 10,
    },
    generateButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 16,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'bold',
    },
})

export default GeneratePDF
