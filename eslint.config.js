// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      "dist/*",
      "app/api/axios.js",
      "app/context/AuthContext.jsx",
      "app/hooks/useAuth.js",
      "app/hooks/useFetch.js",
      "app/navigation/AppTabs.jsx",
      "app/navigation/AuthStack.jsx",
      "app/screens/auth/*",
      "app/screens/dashboard/*",
      "app/screens/detail/*",
      "app/screens/form/*",
      "app/screens/list/*",
      "app/services/authService.js"
    ],
  }
]);
