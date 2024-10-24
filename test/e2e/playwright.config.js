const {defineConfig} = require('playwright/test');

module.exports = defineConfig({
    testDir: './tests/',
    use: {
        headless: false,
        viewport: {width: 1280, height: 720},
        channel: 'chromium',
        launchOptions: {
            slowMo: 100,
            devtools: true
        },
        baseURL: 'http://localhost:3000',
    },
})
