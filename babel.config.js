module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'react-native-reanimated/plugin',
                {
                    globals: ['__labelImage'], // add your globals here
                },
            ],

            ['react-native-worklets-core/plugin'],
        ],
    }
}
