# Tappit AI: 10X Roadmap

**Mission:** Evolve Tappit AI from a best-in-class digital business card into a category-defining, AI-powered relationship engine.

---

### **STEP 1 – CURRENT APP ANALYSIS**

#### **Working Screens & Features**

-   **Auth:** Full login/signup/session management flow (via mock Supabase).
-   **Intro Screen:** A stable, multi-section marketing page (`IntroScreen.tsx`) with dynamic animations and functional modals.
-   **Onboarding:** A polished, 3-step interactive onboarding flow that introduces core concepts.
-   **Home Screen:** A personalized dashboard featuring Quick Actions (Scan/QR), "Green Streak" gamification, and "Delight" cards like Weekly Insights and a simulated Lock Screen Widget.
-   **Card Builder:** A comprehensive, multi-layout (desktop/mobile) card editor with a live 3D preview, template selection, and AI-powered field polishing.
-   **Network Screen:** A complete CRM-lite experience with a contact list, detailed contact view ("Memory Lane"), and an AI-powered relationship summary generator.
-   **Team OS Screen:** An admin-focused dashboard for managing team members, a centralized Brand Kit, and viewing team-wide analytics and activity feeds.
-   **AI Studio:** A powerful suite of "Gems" that add dynamic, AI-driven components to a user's card, including a "Create Gem" feature that uses Gemini to generate new components from a text prompt.
-   **Shop:** A simulated e-commerce experience for purchasing physical cards, including a multi-step checkout modal.
-   **Delight Layer:** Haptics, confetti, and animations are integrated throughout the app to create a premium, "wallpaper-worthy" user experience.

#### **Bugs / Half-Baked Features**

-   **Backend Dependency:** The entire application currently runs on a mock `supabase.ts` file. While this is excellent for frontend development, it's the largest "half-baked" feature. All API calls are simulated.
-   **Simulated Actions:** Many actions resolve with a simple `alert()` (e.g., "Template Saved!"). These need to be wired to the backend and have proper UI states (toasts, confirmations).
-   **Static AI:** All Gemini API calls use static prompts. They don't yet incorporate rich, user-specific context (e.g., analyzing a user's actual title/company for Smart Tags).
-   **Security (XSS Mitigation):** The `CustomGemComponent` relies on a basic client-side sanitizer. While a good first step, this is insufficient for production and represents a known technical debt to be replaced with a sandboxed environment (e.g., iframe).

---

### **STEP 2 – COMPETITOR ANALYSIS**

| Competitor | USP (Unique Selling Proposition)                               | Weak Point                                            | Score |
| :--------- | :------------------------------------------------------------- | :---------------------------------------------------- | :---- |
| **Blinq**  | **Enterprise Powerhouse.** Deep integrations with CRM/HRIS, robust team management, and professional templates. | Lacks consumer-facing "cool factor" and viral loops. Feels very corporate. | 8/10  |
| **Popl**   | **Viral Hardware Ecosystem.** Strong consumer brand built on a wide range of physical NFC products and viral sharing features. | The app feels secondary to the hardware; AI and deep contact management are weaker. | 8/10  |
| **HiHello**| **Digital-First Contact Hub.** Excels at digital-only sharing via email signatures and virtual backgrounds. Strong contact management. | Physical card/NFC offering feels less central. Design is functional but less premium. | 7/10  |

---

### **STEP 3 – 10X SCORECARD**

This scorecard shows where we win, lose, and can create a 10x advantage.

| Feature Axis        | Blinq | Popl | HiHello | **Tappit AI (Current)** | **10X Opportunity**                                                              |
| :------------------ | :---- | :--- | :------ | :-------------------- | :------------------------------------------------------------------------------- |
| **Design & UX**     | 7     | 8    | 6       | **9**                 | We are already winning. We must maintain this "wallpaper-worthy" quality.          |
| **AI Capabilities** | 4     | 3    | 4       | **8**                 | **This is our 10x lever.** We are miles ahead. We must double down on *proactive* AI. |
| **Team Management** | 9     | 6    | 7       | **8**                 | We are competitive. Adding live collaboration and deeper analytics will put us ahead. |
| **Sustainability**  | 5     | 5    | 5       | **7**                 | Our brand is strong here, but we can make it tangible with receipts and leaderboards. |
| **Viral Loops**     | 3     | 9    | 4       | **5**                 | We are weak here. We need to build in social, gamified reasons to share and invite. |

---

### **STEP 4 – 8 NEW 10X FEATURES**

These eight features are designed to exploit our 10X opportunities in AI, Sustainability, and Virality.

**1. Live NFC Bump (Simulation)**
-   **Screen:** `/apps/expo/screens/NFCBumpScreen.tsx`
-   **Supabase:**
    -   Table: `nfc_bumps` (`id`, `bumper_id`, `bumped_id`, `timestamp`)
    -   Query: `INSERT INTO nfc_bumps (bumper_id, bumped_id) VALUES ($1, $2)`
-   **UX:** A full-screen UI that simulates two phones coming together, triggering a haptic pulse and a "Contact Exchanged" confirmation.

**2. AI Ice-Breaker Voice Note**
-   **Screen:** `/apps/expo/screens/VoiceIcebreakerGem.tsx`
-   **Supabase:**
    -   Table: `gems` (`id`, `user_id`, `type`, `config`)
    -   Query: Uses Gemini's audio capabilities. No direct table query needed for the feature itself.
-   **UX:** User records a 10-second voice intro, which is transcribed by AI and used to generate 3 personalized icebreaker questions for their card.

**3. Team Brand-Kit Live Preview**
-   **Screen:** `/apps/expo/screens/LiveBrandKitPreviewScreen.tsx`
-   **Supabase:**
    -   Table: `brand_kits`, `team_members`
    -   Query: `SELECT name, title, avatarUrl FROM team_members WHERE team_id = $1 LIMIT 6`
-   **UX:** A split-screen editor where an admin modifies the Brand Kit on the left, and a grid of 6 team cards on the right updates in real-time.

**4. Green-Streak Leaderboard**
-   **Screen:** `/apps/expo/screens/GreenStreakLeaderboardScreen.tsx`
-   **Supabase:**
    -   Table: `green_streaks` (`id`, `user_id`, `streak_count`)
    -   Query: `SELECT u.name, u.avatarUrl, g.streak_count FROM green_streaks g JOIN user_profiles u ON g.user_id = u.id ORDER BY g.streak_count DESC LIMIT 20`
-   **UX:** A gamified leaderboard showing the top users by their daily tap streak, fostering competition and daily engagement.

**5. One-Tap Calendly Roulette**
-   **Screen:** `/apps/expo/screens/CalendlyRouletteGem.tsx`
-   **Supabase:**
    -   Table: `contacts` (with `last_interaction_date` and `calendly_url` fields)
    -   Query: `SELECT * FROM contacts WHERE last_interaction_date < NOW() - INTERVAL '30 days' AND calendly_url IS NOT NULL ORDER BY random() LIMIT 1`
-   **UX:** An "AI Nudge" that finds a cold contact and presents a single button to directly book a meeting in their Calendly, re-igniting the relationship.

**6. Carbon-Offset Receipt**
-   **Screen:** `/apps/expo/screens/CarbonOffsetReceiptScreen.tsx`
-   **Supabase:**
    -   Table: `trees_planted` (`id`, `user_id`, `certificate_id`, `location`, `timestamp`)
    -   Query: `SELECT * FROM trees_planted WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 1`
-   **UX:** A beautiful, shareable, official-looking digital receipt is generated every time a user's Green Streak plants a tree.

**7. Wallet Pass Live-Update**
-   **Screen:** `/apps/expo/screens/WalletPassSettingsScreen.tsx`
-   **Supabase:**
    -   Table: `wallet_passes` (`id`, `user_id`, `pass_data`, `last_updated`)
    -   Query: `UPDATE wallet_passes SET pass_data = $1 WHERE user_id = $2`
-   **UX:** In the Card Builder, a toggle "Push changes to Wallet" initiates an animation showing the new info being synced to a simulated Apple Wallet pass.

**8. Referral Bamboo Card Giveaway**
-   **Screen:** `/apps/expo/screens/ReferralGiveawayScreen.tsx`
-   **Supabase:**
    -   Table: `referrals` (`id`, `referrer_id`, `referred_id`, `status`)
    -   Query: `SELECT count(*) FROM referrals WHERE referrer_id = $1 AND status = 'completed'`
-   **UX:** A dedicated screen with a unique referral link and a progress bar. When a user successfully refers 5 friends, they unlock a form to claim a free physical bamboo card.

