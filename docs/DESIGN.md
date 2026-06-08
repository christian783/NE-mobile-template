---
name: Modern Dark Lexicon
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c2c6d5'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8c909e'
  outline-variant: '#424753'
  surface-tint: '#acc7ff'
  primary: '#acc7ff'
  on-primary: '#002f68'
  primary-container: '#508ff8'
  on-primary-container: '#00285b'
  inverse-primary: '#005bbf'
  secondary: '#cebdff'
  on-secondary: '#381385'
  secondary-container: '#4f319c'
  on-secondary-container: '#bea8ff'
  tertiary: '#45dfa4'
  on-tertiary: '#003825'
  tertiary-container: '#00a574'
  on-tertiary-container: '#003120'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#acc7ff'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#004492'
  secondary-fixed: '#e8ddff'
  secondary-fixed-dim: '#cebdff'
  on-secondary-fixed: '#21005e'
  on-secondary-fixed-variant: '#4f319c'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-word:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-word-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-md:
    fontFamily: DM Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  definition-body:
    fontFamily: DM Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
  phonetic-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '450'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  helper-text:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  huge: 48px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

This design system is built for a premium, editorial reading experience focused on linguistic discovery. The brand personality is scholarly yet contemporary, blending the authoritative weight of traditional lexicography with the sleekness of high-end mobile software.

The aesthetic utilizes a **Minimalist** foundation layered with **Tonal Depth**. It prioritizes extreme legibility and a focused "reading mode" atmosphere. By leveraging a dark-mode-first approach, the UI recedes into the background, allowing the high-contrast typography to remain the primary focus. The emotional response is one of intellectual calm and sophisticated precision.

## Colors

The palette is anchored in a deep, "ink" black to reduce eye strain during extended reading sessions. 

- **Primary (Electric Blue):** Used sparingly for interactive elements, primary buttons, and active search states.
- **Secondary (Soft Violet):** Specifically reserved for phonetic notation (IPA) and linguistic metadata, distinguishing technical data from semantic meaning.
- **Success & Error:** Mint green and soft red provide functional feedback for "Word Found" or "No Results" states without breaking the dark aesthetic.
- **Tonal Logic:** Surfaces are built using a tiered dark-gray approach (#1A1A1A) to create a sense of verticality against the true-black (#0D0D0D) background.

## Typography

The typography system is the core of the design system. It uses a high-contrast pairing of a traditional serif and a modern geometric sans-serif.

- **Playfair Display:** Used exclusively for the "Word of the Day" and the primary word entries. It signals authority and elegance.
- **DM Sans:** Optimized for long-form reading of definitions and examples. The low contrast and geometric shapes ensure clarity on OLED screens.
- **JetBrains Mono:** Employed for IPA transcriptions, word origins, and technical data. The monospaced nature helps users distinguish individual characters in phonetic symbols.

Hierarchy is maintained through weight and color (Primary White for definitions, Secondary Gray for examples).

## Layout & Spacing

This design system uses a **Fluid Grid** model with generous safe areas to maintain a "breathable" editorial feel. 

- **Mobile Philosophy:** A standard 4-column grid for mobile devices (iPhone 14/Android).
- **Margins:** A consistent 20px side margin ensures text does not crowd the edges of the display.
- **Vertical Rhythm:** Definitions and examples are grouped with `sm` (12px) spacing, while major sections (Synonyms, Etymology) are separated by `xl` (32px) or `huge` (48px) spacing to allow the eye to rest.
- **Safe Areas:** Interactive elements like the search bar are anchored with bottom-safe-area considerations for modern gesture-based navigation.

## Elevation & Depth

Depth is communicated through **Tonal Layers** rather than heavy shadows, preserving the "Dark Lexicon" aesthetic.

1.  **Level 0 (Base):** #0D0D0D — The main background where the core content resides.
2.  **Level 1 (Cards):** #1A1A1A — Used for definition cards and list items. These should have a subtle 1px border of #2A2A2A to define their edges.
3.  **Level 2 (Overlays/Modals):** #242424 — Used for bottom sheets and menus.
4.  **Shadows:** When necessary (e.g., on a floating action button), use an ultra-diffused shadow: `box-shadow: 0 10px 30px rgba(0,0,0,0.5)`.

Avoid high-contrast glows; keep the elevation subtle to ensure the user feels "immersed" in the text.

## Shapes

The shape language is **Rounded** to soften the technical nature of a dictionary. 

- **Cards and Containers:** Use a 0.5rem (8px) corner radius as the standard.
- **Search Bars:** Utilize `rounded-xl` (24px) to create a distinct, friendly shape that stands out from the content cards.
- **Interactive States:** Pressed states should not change shape, but can scale down slightly (98%) to provide tactile feedback.

## Components

- **Search Bar:** A prominent fixed or floating element. Background: #1A1A1A, Border: #2A2A2A. Use "JetBrains Mono" for the placeholder text to hint at the technical precision of the tool.
- **Definition Cards:** Use #1A1A1A with a 1px #2A2A2A border. Vertical stacks of definition entries should be separated by a subtle divider.
- **Phonetic Chips:** Small, #A78BFA (soft violet) tinted background with 10% opacity, featuring #A78BFA text in JetBrains Mono.
- **Primary Buttons:** Solid #4F8EF7 background with #F5F5F5 text. Use `rounded-lg` for a modern, accessible look.
- **Audio Toggle:** A circular button with a subtle primary color icon. Use a soft background blur if placed over a header image.
- **Scroll Indicators:** Use a thin, #2A2A2A track with a #4F8EF7 thumb to provide feedback on long definition pages.