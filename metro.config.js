// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);
config.resolver.unstable_enablePackageExports = true;

const wrapped = withNativeWind(config, { input: './global.css' });

wrapped.watchFolders = [path.resolve(__dirname)];

module.exports = wrapped;
