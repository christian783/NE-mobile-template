You are a senior React Native developer. Your task is to implement a complete, 
production-ready cross-platform Dictionary Mobile Application called "LexiDict" 
using React Native with Expo. The UI screens have already been designed and are 
available as HTML reference files in the /docs folder. Your job is to implement 
the full working application by wiring up all logic, navigation, API integration, 
state management, and services into the existing project scaffold.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT STRUCTURE (already scaffolded — do not rename folders)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NE-MOBILE-TEMPLATE/
├── app/
│   ├── api/           → axios instance and API call functions
│   ├── components/    → reusable UI components
│   ├── constants/     → colors, fonts, spacing, theme tokens
│   ├── context/       → React Context for search history
│   ├── hooks/         → custom React hooks
│   ├── navigation/    → drawer + stack navigator setup
│   ├── screens/       → all screen components
│   ├── services/      → audio service, storage service
│   └── utils/         → input validation utility
├── assets/
│   └── logo.png       → already present, use it
├── docs/              → HTML design references (READ ONLY)
│   ├── DESIGN.md
│   ├── splash-screen.html
│   ├── search-screen.html
│   ├── search-screen-loading.html
│   ├── search-screen-validation-error.html
│   ├── word-detail-screen.html
│   ├── word-detail(audio-playing).html
│   ├── word-not-found-screen.html
│   ├── network-error-screen.html
│   ├── drawer-navigation(history).html
│   └── drawer-navigation(empty-history).html
├── App.jsx            → entry point
├── app.json           → Expo config
├── babel.config.js    → already configured
├── .env.example       → copy to .env
└── package.json       → dependencies to install

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 0 — BEFORE WRITING ANY CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Read every HTML file inside /docs carefully. Extract:
   - Exact color values, font sizes, spacing used
   - Component layout structure per screen
   - All interactive states shown (default, loading, error, empty)
   - Text content and copy used in each screen

2. Read DESIGN.md for design tokens and any designer notes.

3. Map each HTML screen to its corresponding React Native screen file:
   splash-screen.html            → screens/SplashScreen.jsx
   search-screen.html            → screens/SearchScreen.jsx
   search-screen-loading.html    → screens/SearchScreen.jsx (loading state)
   search-screen-validation.html → screens/SearchScreen.jsx (error state)
   word-detail-screen.html       → screens/WordDetailScreen.jsx
   word-detail(audio-playing)    → screens/WordDetailScreen.jsx (audio state)
   word-not-found-screen.html    → screens/WordNotFoundScreen.jsx
   network-error-screen.html     → screens/NetworkErrorScreen.jsx
   drawer-navigation(history)    → navigation/DrawerContent.jsx
   drawer-navigation(empty)      → navigation/DrawerContent.jsx (empty state)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — INSTALL DEPENDENCIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Run the following installs:

npx expo install expo-av expo-font expo-splash-screen
npx expo install @react-native-async-storage/async-storage
npx expo install @expo/vector-icons

npm install axios
npm install @react-navigation/native @react-navigation/drawer @react-navigation/stack
npm install react-native-gesture-handler react-native-reanimated react-native-screens
npm install react-native-safe-area-context react-native-vector-icons

npm install @expo-google-fonts/playfair-display
npm install @expo-google-fonts/dm-sans
npm install @expo-google-fonts/jetbrains-mono

Add to babel.config.js plugins array if not already present:
  'react-native-reanimated/plugin'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — CONSTANTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE: app/constants/colors.js
Export a COLORS object matching the design exactly:
{
  background:    '#0D0D0D',
  surface:       '#1A1A1A',
  surfaceDeep:   '#121212',
  accent:        '#4F8EF7',
  accentMuted:   '#1E2D45',
  violet:        '#A78BFA',
  success:       '#34D399',
  error:         '#F87171',
  textPrimary:   '#F5F5F5',
  textSecondary: '#9CA3AF',
  border:        '#2A2A2A',
  inactive:      '#3A3A3A',
}

FILE: app/constants/fonts.js
Export FONTS object:
{
  display:   'PlayfairDisplay_700Bold',
  displayIt: 'PlayfairDisplay_700Bold_Italic',
  body:      'DMSans_400Regular',
  bodyMed:   'DMSans_500Medium',
  mono:      'JetBrainsMono_400Regular',
}

FILE: app/constants/spacing.js
Export SPACING: { xs:4, sm:8, md:16, lg:24, xl:32 }
Export RADIUS:  { sm:8, md:14, lg:16, full:9999 }

FILE: app/constants/index.js
Re-export all constants from one entry point.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — ENVIRONMENT CONFIG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE: .env
  EXPO_PUBLIC_API_BASE_URL=https://api.dictionaryapi.dev/api/v2/entries/en
  EXPO_PUBLIC_HISTORY_STORAGE_KEY=lexi_search_history

FILE: app/constants/config.js
  export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
  export const HISTORY_KEY  = process.env.EXPO_PUBLIC_HISTORY_STORAGE_KEY;

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — API LAYER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE: app/api/axiosInstance.js
- Create an axios instance with:
  baseURL: API_BASE_URL from config
  timeout: 10000
  headers: { 'Content-Type': 'application/json' }
- Add a response interceptor that:
  - On success: returns response.data
  - On error: checks error.response.status
    - 404 → throws new Error('WORD_NOT_FOUND')
    - Network error (no response) → throws new Error('NETWORK_ERROR')
    - Any other → throws new Error('SERVER_ERROR')

FILE: app/api/dictionaryApi.js
- Import axiosInstance
- Export one function:

  export const fetchWord = async (word) => {
    // GET /{word}
    // Returns the raw API JSON array on success
    // Throws typed errors from the interceptor on failure
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 5 — UTILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE: app/utils/validateInput.js
Export:
  validateInput(word: string): { valid: boolean, error?: string }

Rules (in order):
  1. Trimmed value is empty → { valid: false, error: 'Please enter a word to search.' }
  2. Contains digits → { valid: false, error: 'Word must contain letters only.' }
  3. Contains special characters (not hyphen) → same error as above
  4. Length > 60 → { valid: false, error: 'Word is too long.' }
  5. Otherwise → { valid: true }

Also export:
  sanitizeWord(word: string): string
  → trims and lowercases the word before sending to API

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 6 — SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE: app/services/storageService.js
Use @react-native-async-storage/async-storage and HISTORY_KEY.
Export these async functions:

  getHistory(): Promise<string[]>
  → reads key, parses JSON, returns array (empty array if null)

  saveToHistory(word: string): Promise<void>
  → reads existing history
  → if word already exists (case-insensitive), skip (no duplicates)
  → prepends word to front of array
  → caps list at 50 items
  → saves back to storage

  clearHistory(): Promise<void>
  → removes the key entirely

FILE: app/services/audioService.js
Use expo-av Audio module.
Export:

  playAudio(audioUrl: string): Promise<void>
  → Creates a new Audio.Sound instance
  → Loads from URI (audioUrl)
  → Sets audio mode: allowsRecordingIOS false, 
    playsInSilentModeIOS true
  → Plays the sound
  → On playback status update: when didJustFinish, unloads sound
  → On any error: throws new Error('AUDIO_PLAYBACK_FAILED')
  → Always unloads sound in a finally block to prevent memory leaks

  Also export a ref-based version for components that need 
  to track playing state:
  
  useAudioPlayer(): { isPlaying, play(url), stop() }
  → Returns state and controls for use in components

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 7 — CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE: app/context/HistoryContext.jsx
Create a React Context with Provider:

State:
  history: string[]  (list of previously searched words)

Actions exposed via context value:
  addToHistory(word)  → calls storageService.saveToHistory, 
                        then refreshes history state
  loadHistory()       → calls storageService.getHistory, 
                        sets history state
  clearHistory()      → calls storageService.clearHistory, 
                        resets history to []

Behavior:
  → On mount (useEffect), call loadHistory() automatically
  → Wrap the entire app in this provider (see App.jsx)

Export:
  HistoryProvider (component)
  useHistory() custom hook → returns context value, 
    throws if used outside provider

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 8 — CUSTOM HOOKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE: app/hooks/useDictionary.js
This is the main data-fetching hook. Export:

  useDictionary(): { 
    wordData, loading, error, errorType, search(word) 
  }

Internal state:
  wordData: null | API response object (first item in array)
  loading: boolean
  error: string | null
  errorType: null | 'WORD_NOT_FOUND' | 'NETWORK_ERROR' | 'SERVER_ERROR'

search(word) function:
  1. Calls validateInput(word) — if invalid, sets error and returns
  2. Sanitizes word with sanitizeWord(word)
  3. Sets loading: true, clears previous error and wordData
  4. Calls fetchWord(sanitizedWord)
  5. On success:
     → sets wordData to response[0]
     → calls addToHistory(sanitizedWord) from useHistory()
     → returns wordData for navigation
  6. On error:
     → parses error.message to set errorType
     → sets error message string
  7. Always sets loading: false in finally

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 9 — REUSABLE COMPONENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build each as a pure, reusable component styled with 
React Native StyleSheet, matching the HTML docs exactly.

FILE: app/components/SearchBar.jsx
Props: { value, onChangeText, onSubmit, error, loading }
- TextInput with magnifier icon (left) and submit button (right)
- Border changes to COLORS.error when error prop is truthy
- Submit button disabled and opacity 0.5 when loading
- onSubmitEditing triggers onSubmit
- Keyboard type: default, returnKeyType: 'search'

FILE: app/components/LoadingDots.jsx
- Three animated dots bouncing in sequence using Animated API
- Color: COLORS.accent
- Text below: "Looking up your word..."
- Uses staggered Animated.loop with Animated.sequence per dot

FILE: app/components/WordHeroCard.jsx
Props: { word, phonetic, audioUrl }
- Displays word in FONTS.display large
- Phonetic in FONTS.mono, COLORS.violet
- Speaker icon (Ionicons 'volume-high') in COLORS.accent
- If audioUrl is null/empty: icon color COLORS.inactive, disabled
- If isPlaying: icon pulses with Animated.loop opacity animation
- onPress: calls useAudioPlayer().play(audioUrl)

FILE: app/components/MeaningSection.jsx
Props: { meaning }  (one meaning object from API)
- Renders: part of speech pill badge + horizontal line
- Maps over meaning.definitions array
- Each definition: numbered, definition text, 
  example sentence (if exists) with left accent border

FILE: app/components/PartOfSpeechBadge.jsx
Props: { label }
- Pill: bg COLORS.accent at 15% opacity, 
  text COLORS.accent, uppercase, FONTS.bodyMed 12px

FILE: app/components/ErrorMessage.jsx
Props: { message }
- Small text below SearchBar in COLORS.error
- Fade-in using Animated.timing on mount

FILE: app/components/AppHeader.jsx
Props: { title, onMenuPress, onBackPress, showBack }
- If showBack: show back arrow on left (navigates back)
- Else: show hamburger on left (opens drawer)
- Center: title text
- Background: COLORS.background

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 10 — SCREENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Implement each screen to pixel-match the corresponding HTML doc.
All screens use SafeAreaView as root, background COLORS.background.

FILE: app/screens/SplashScreen.jsx
- Shows logo.png (from assets), app name, tagline
- Animated fade-in on mount (Animated.timing opacity 0→1, 800ms)
- After 2000ms, navigate to 'Search' using 
  navigation.replace('Search')
- No header

FILE: app/screens/SearchScreen.jsx
States to handle (all in one component using useDictionary hook):
  IDLE:     Show hero quote + SearchBar
  LOADING:  Hide submit button, show LoadingDots centered
  ERROR:    Show ErrorMessage below SearchBar, keep input focused
  SUCCESS:  Navigate to WordDetail, passing wordData as route param

Navigation on success:
  navigation.navigate('WordDetail', { wordData })

Reference docs: 
  search-screen.html (idle)
  search-screen-loading.html (loading)
  search-screen-validation-error.html (validation error)

Use KeyboardAvoidingView wrapping the whole screen.
Hint text at bottom: "Tap the menu to revisit past searches"

FILE: app/screens/WordDetailScreen.jsx
- Receives route.params.wordData
- Also accepts optional route.params.word (for history re-search)
  If word param present and no wordData, trigger search on mount
- Renders:
  AppHeader with showBack=true, title=wordData.word
  WordHeroCard (word, phonetic, audioUrl from phonetics array)
  ScrollView containing MeaningSection for each meaning
- Audio URL selection logic:
  Find first phonetics entry where audio is non-empty string
  If none found, pass null to WordHeroCard

Reference docs:
  word-detail-screen.html
  word-detail(audio-playing).html

FILE: app/screens/WordNotFoundScreen.jsx
- Shows broken book icon, "Word Not Found" title, message
- "Try Again" button → navigation.goBack() to SearchScreen
Reference: word-not-found-screen.html

FILE: app/screens/NetworkErrorScreen.jsx
- Shows no-wifi icon, "Connection Error" title, message
- "Try Again" button → navigation.goBack()
Reference: network-error-screen.html

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 11 — NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE: app/navigation/DrawerContent.jsx
Custom drawer component. Props: navigation (from drawer)
Uses useHistory() context hook.

Renders:
  Header: logo + "LexiDict" title
  Label: "Search History" + divider
  
  If history.length > 0:
    FlatList of history items, each showing:
      - Clock icon (Ionicons 'time-outline'), 18px, COLORS.textSecondary
      - Word text, FONTS.bodyMed 15px, COLORS.textPrimary
      - Chevron right icon, COLORS.inactive
      - onPress: 
          navigation.closeDrawer()
          navigation.navigate('WordDetail', { word: item })

  If history.length === 0:
    Centered empty state: magnifier icon + 
    "No searches yet. Start exploring words!"

  Footer: "LexiDict v1.0.0" in COLORS.inactive

Reference docs:
  drawer-navigation(history).html
  drawer-navigation(empty-history).html

FILE: app/navigation/AppNavigator.jsx
Set up navigation tree:

  <NavigationContainer>
    <HistoryProvider>                    ← wraps everything
      <DrawerNavigator
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{ width: '75%', backgroundColor: COLORS.surfaceDeep }}
        overlayColor: 'rgba(0,0,0,0.5)'
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Main">
          {() => (
            <StackNavigator
              screenOptions={{ headerShown: false, 
                cardStyle: { backgroundColor: COLORS.background } }}
            >
              <Stack.Screen name="Splash"      component={SplashScreen} />
              <Stack.Screen name="Search"      component={SearchScreen} />
              <Stack.Screen name="WordDetail"  component={WordDetailScreen} />
              <Stack.Screen name="NotFound"    component={WordNotFoundScreen} />
              <Stack.Screen name="NetworkError" component={NetworkErrorScreen} />
            </StackNavigator>
          )}
        </Drawer.Screen>
      </DrawerNavigator>
    </HistoryProvider>
  </NavigationContainer>

Note: The DrawerNavigator wraps the StackNavigator so the 
drawer overlays every screen. SearchScreen and WordDetailScreen 
both need access to navigation.openDrawer() via 
useNavigation().getParent().

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 12 — ENTRY POINT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE: App.jsx
- Load all three font families using useFonts from 
  @expo-google-fonts packages
- While fonts loading: return null (or keep native splash screen)
  Use SplashScreen.preventAutoHideAsync() + SplashScreen.hideAsync()
  from expo-splash-screen, hide after fonts ready
- Render <AppNavigator /> once fonts are loaded

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 13 — ERROR ROUTING LOGIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In SearchScreen, after calling search(word) from useDictionary:
  if errorType === 'WORD_NOT_FOUND' → navigate to 'NotFound'
  if errorType === 'NETWORK_ERROR'  → navigate to 'NetworkError'
  if errorType === 'SERVER_ERROR'   → show inline error in SearchBar
  if wordData                       → navigate to 'WordDetail'

This keeps the error screens separate from the search screen 
and allows the back button to return to search on all error screens.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 14 — API RESPONSE PARSING CONTRACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Free Dictionary API returns this shape on success:
[
  {
    "word": "hello",
    "phonetic": "/həˈloʊ/",
    "phonetics": [
      { "text": "/həˈloʊ/", "audio": "https://...mp3" },
      { "text": "/ˈhɛloʊ/", "audio": "" }
    ],
    "meanings": [
      {
        "partOfSpeech": "exclamation",
        "definitions": [
          {
            "definition": "Used as a greeting.",
            "example": "Hello there, Katie!"
          }
        ]
      }
    ]
  }
]

Your parsing rules:
- Always use response[0] as the primary word object
- phonetic display: use wordData.phonetic, 
  fallback to wordData.phonetics[0]?.text, fallback to ''
- audio URL: find first item in phonetics[] where audio !== ''
  fallback to null if none found
- meanings: iterate wordData.meanings[]
- definitions: iterate meaning.definitions[]
- example: definition.example may be undefined — always check

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 15 — QUALITY CHECKLIST (verify before finishing)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Navigation:
  [ ] Splash auto-navigates to Search after 2s
  [ ] Search → WordDetail on success
  [ ] Search → NotFound on 404
  [ ] Search → NetworkError on no connection
  [ ] WordDetail back button returns to Search
  [ ] Error screens back button returns to Search
  [ ] Drawer opens from hamburger on Search and WordDetail
  [ ] Tapping history item closes drawer and shows WordDetail

Search & API:
  [ ] Empty search shows inline validation error (does not call API)
  [ ] Loading dots show during API call
  [ ] Successful response navigates and shows all meanings
  [ ] Word is saved to history after successful search
  [ ] Duplicate words are not added to history twice
  [ ] History persists across app restarts (AsyncStorage)

Audio:
  [ ] Speaker icon visible when audio URL present
  [ ] Icon grayed out when no audio URL
  [ ] Tapping icon plays the audio
  [ ] Playing state shows pulse animation on icon
  [ ] Audio stops and cleans up when screen unmounts

Robustness:
  [ ] App does not crash on malformed API response
  [ ] App does not crash if phonetics array is empty
  [ ] App does not crash if definitions have no example
  [ ] All TouchableOpacity elements have activeOpacity={0.75}
  [ ] KeyboardAvoidingView prevents keyboard covering SearchBar
  [ ] ScrollView on WordDetail supports long definition lists

Styling:
  [ ] All colors reference COLORS constants (no hardcoded hex)
  [ ] All fonts reference FONTS constants
  [ ] All spacing uses SPACING constants
  [ ] Visual output matches the HTML docs in /docs folder
  [ ] Dark background on every screen
  [ ] StatusBar style set to 'light-content' on every screen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXECUTION ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Execute in this exact order to avoid import errors:

1. Install dependencies
2. Create .env from .env.example
3. constants/ (colors, fonts, spacing, config, index)
4. utils/validateInput.js
5. app/api/axiosInstance.js
6. app/api/dictionaryApi.js
7. app/services/storageService.js
8. app/services/audioService.js
9. app/context/HistoryContext.jsx
10. app/hooks/useDictionary.js
11. app/components/* (all 7 components)
12. app/screens/SplashScreen.jsx
13. app/screens/WordNotFoundScreen.jsx
14. app/screens/NetworkErrorScreen.jsx
15. app/screens/WordDetailScreen.jsx
16. app/screens/SearchScreen.jsx
17. app/navigation/DrawerContent.jsx
18. app/navigation/AppNavigator.jsx
19. App.jsx
20. Run: npx expo start
    Test on Android emulator AND iOS simulator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Use ONLY React Native core components (View, Text, TextInput, 
  ScrollView, FlatList, TouchableOpacity, Pressable, Animated, 
  StyleSheet, SafeAreaView, KeyboardAvoidingView, StatusBar)
- Do NOT use any web CSS — all styles via StyleSheet.create()
- Do NOT use class components — functional components + hooks only
- Use axios (already in instructions) — do NOT use fetch()
- Do NOT use Redux — React Context only
- All async operations must have try/catch/finally
- No console.log left in production code — use console.error only 
  for caught exceptions
- Every file must have a default export
- Use named exports for hooks and utilities