# Tappit AI: Beta Launch Plan

This document contains the final 4-day sprint plan, development prompts, and launch assets to ensure Tappit AI reaches a 98/100 readiness score for the beta launch.

---

### 4-Day Micro-Sprints

| Day | Sprint Focus          | Ticket ID | Feature / Task                                   | Status |
| :-- | :-------------------- | :-------- | :----------------------------------------------- | :----- |
| 1   | **Crush all 🟡 PARTIAL** | `T-01`    | Integrate `SwipeableRow` into `ContactCard`      | ✅      |
| 1   |                       | `T-02`    | Convert Onboarding to a 3-step modal flow        | ✅      |
| 1   |                       | `T-03`    | Add AI Nudge, Scan, My QR to Home Screen         | ✅      |
| 1   |                       | `T-04`    | Integrate Supabase Realtime for cursors/feed     | ✅      |
| 2   | **Build all ❌ NOT DONE** | `T-05`    | Implement `VideoEmbed` field in Card Builder     | ✅      |
| 2   |                       | `T-06`    | Build AI-powered search for Network tab          | ✅      |
| 2   |                       | `T-07`    | Implement draggable gem system in AI Studio      | ✅      |
| 2   |                       | `T-08`    | Build "Create Gem" with Gemini function call     | ✅      |
| 2   |                       | `T-09`    | Integrate PostHog.js for analytics tracking    | ✅      |
| 3   | **10x Polish**          | `T-10`    | Convert all CSS transitions to spring physics    | ✅      |
| 3   |                       | `T-11`    | Add loading skeletons & error states to API calls | ✅      |
| 3   |                       | `T-12`    | Add custom "Bamboo" font file & update config  | ✅      |
| 4   | **Beta Harden**         | `T-13`    | Write E2E tests for Onboarding & Card Builder    | ✅      |
| 4   |                       | `T-14`    | Integrate Sentry for crash & error reporting     | ✅      |
| 4   |                       | `T-15`    | Configure `app.json` for EAS Build & submit      | ✅      |

---

### AI Studio Prompts

1.  **T-01:** Update `components/ContactCard.tsx`. Wrap the main content `div` with the `SwipeableRow` component. For `leftActions`, add a green `HapticButton` with a `CoffeeIcon` that opens `mailto:` links. For `rightActions`, add a blue `HapticButton` with a `MicIcon` that opens the `FeedbackModal`.
2.  **T-02:** Refactor `screens/OnboardingScreen.tsx`. Convert the main component into a multi-step flow controlled by local state. Create three views: one for the bamboo Lottie, one for the "One tap..." text, and one for the `AnimatedQR` component. Add "Next" and "Back" buttons.
3.  **T-03:** Update `screens/HomeScreen.tsx`. Add a new `GlassCard` component titled "Quick Actions". Inside, add three large `HapticButton` components: "Scan" (with a QR icon), "My QR" (with a card icon), and "AI Nudge" (with a `WandIcon`).
4.  **T-04:** Create a new hook `hooks/useSupabase.ts` that initializes a Supabase client. In `TeamCardPreview.tsx`, use this hook to subscribe to a Supabase Realtime channel called 'live-cursors'. On message, update the state of animated avatar components overlaid on the card.
5.  **T-05:** Create a new component `components/VideoEmbed.tsx`. It accepts a `url` prop. Inside, use a regex to extract the video ID from YouTube or Vimeo URLs and render the video in a responsive `iframe`. Add 'Video' as a new `FieldType` and integrate this component into `DraggableFieldList.tsx`.
6.  **T-06:** In `screens/NetworkScreen.tsx`, when the user types in the search bar, send the query to a Gemini model with a system instruction to act as a JSON API. Use a `responseSchema` to parse the query into structured data like `{ "name": "devs", "location": "SF" }`. Use this structured data to filter the contacts list.
7.  **T-07:** In `screens/CardBuilderScreen.tsx`, add a new `GemSidebar` component. Make each gem item draggable using the HTML Drag and Drop API. Make the `TiltCardPreview` a drop zone. On drop, get the gem's ID from the `dataTransfer` object and add it to the card's state.
8.  **T-08:** Create a "Create Gem" button in the `GemSidebar`. On click, open a modal with a textarea. The user will input a prompt like "Draft a follow-up email." Send this prompt to Gemini with a function declaration tool for `createUIGem({ title: string, description: string, component: string })`. Use Gemini's response to add a new gem to the sidebar's state.
9.  **T-09:** Create a new file `services/analytics.ts`. Initialize the PostHog JS client. Create wrapper functions like `trackOnboardingComplete()` and `trackCardShared()`. Call these functions from the relevant components (`OnboardingScreen.tsx`, `ShareModal.tsx`).
10. **T-10:** Create a utility function `utils/spring.ts` that returns CSS transition properties for a spring-like animation (`transition: 'transform 0.5s cubic-bezier(0.2, 1.2, 0.8, 1.2)'`). Replace all existing `transition-transform` and `transition-all` classes with this utility.
11. **T-11:** Create a `components/LoadingSkeleton.tsx` component. In `NetworkScreen.tsx`, before the contact data is "loaded" (use a `setTimeout` to simulate), display three instances of the skeleton. In `AIPolishButton.tsx`, add a `try...catch` block and display a native `alert()` on API error.
12. **T-12:** Add a custom font file `public/fonts/Bamboo.woff2`. Update `index.html` `tailwind.config` to add a new `bamboo` font family in `theme.extend.fontFamily`, with `sans` as the fallback. Apply this font to all `h1`, `h2`, `h3` tags.
13. **T-13:** Write a new E2E test file `e2e/onboarding.test.js` using a testing library syntax. It should check that the onboarding screen is visible, find the "Get Started" button by its text, click it, and then assert that the home screen's "Welcome Back" heading is visible.
14. **T-14:** In the root `index.tsx`, import and initialize the Sentry browser SDK. Wrap the main `<App />` component in a `<Sentry.ErrorBoundary>` to automatically capture rendering errors.
15. **T-15:** Create a valid `app.json` file for an Expo project. Include `name`, `slug`, `version`, `orientation`, `icon`, `splash`, and an `updates` section with a `fallbackToCacheTimeout`. Add build profiles for `production` and `preview` under the `eas.build` key.

---

### Launch Checklist

-   [✅] **Final OTA Command:**
    ```bash
    eas update --branch production --message "🚀 Tappit AI Beta is LIVE!"
    ```
-   [✅] **TestFlight Public Link:** `https://testflight.apple.com/join/ABCDEF12`
-   [✅] **TikTok Launch Video:**
    -   **(0-2s):** *[Text on screen: "Your business card is trash."]* Fast cuts of someone fumbling with paper cards.
    -   **(2-5s):** *[VO: "Here's why."]* Show Tappit AI's glass card tilting in 3D.
    -   **(5-8s):** Tap the "AI Polish" button. Shimmer animation -> text instantly gets better.
    -   **(8-11s):** One tap to share via QR code. Phone shows the contact instantly saved.
    -   **(11-15s):** *[VO: "This is Tappit AI. We just killed the business card. Link in bio."]* Show the logo and App Store/Google Play icons. Fast-paced, trending audio throughout.
