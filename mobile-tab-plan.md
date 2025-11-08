# Tappit AI: Mobile Navigation Refactor Plan

**Mission:** Convert the existing 7-tab application into an intuitive, mobile-first 5-tab bottom navigation structure, with secondary items housed in a "More" sheet.

---

### 1. Bottom Navigation Structure (5 Tabs)

The primary `BottomNavBar` will be simplified to the five most critical, high-frequency user actions.

1.  **Home:** The main dashboard and entry point.
2.  **Cards:** The card builder and all card-related actions (`CardBuilderScreen`).
3.  **Network:** The user's contact list and CRM-lite features (`NetworkScreen`).
4.  **Team:** The team management and analytics dashboard (`TeamScreen`).
5.  **More (⋯):** A dedicated action to open a sheet containing all other application screens.

---

### 2. The "More" Sheet

Clicking the "More" tab will present a full-screen, swipe-to-dismiss modal (`MoreSheet.tsx`) containing secondary navigation items. This keeps the main UI clean while providing easy access to less-frequented but important features.

-   **Analytics:** A dedicated screen for user and team performance metrics.
-   **Shop:** The e-commerce section for purchasing physical cards.
-   **Settings:** App-level settings (notifications, theme, etc.).
-   **Profile:** User profile editing.
-   **One-Tap Calendly Roulette:** A 10x feature for re-engagement.
-   **Referral Bamboo Giveaway:** A 10x feature for viral growth.

---

### 3. Final 10X Feature Placement

The eight new 10x features will be integrated into the most logical existing screens to enhance their functionality, rather than living in a separate, disconnected tab.

| Feature                        | Parent Screen / Location         | Justification                                                              |
| :----------------------------- | :------------------------------- | :------------------------------------------------------------------------- |
| **Live NFC Bump**              | `CardBuilderScreen`              | Directly related to the action of sharing one's primary card.              |
| **AI Voice Ice-breaker**       | `NetworkScreen`                  | A tool for enhancing connections, best placed within the contact management hub. |
| **Team Brand-Kit Live Preview**| `TeamScreen`                     | A core feature for team admins, belonging in the team management OS.       |
| **Green-Streak Leaderboard**   | `AnalyticsScreen` (in "More")    | A key metric of user engagement, perfect for the main analytics dashboard. |
| **Carbon-Offset Receipt**      | `AnalyticsScreen` (in "More")    | A tangible result of user activity, belonging with other impact metrics.     |
| **Wallet Pass Live-Update**    | `CardBuilderScreen`              | A card-specific setting that logically lives within the card editor.       |
| **One-Tap Calendly Roulette**  | `MoreSheet`                      | A standalone "gem" or power-user feature, accessible from the More menu.     |
| **Referral Bamboo Giveaway**   | `MoreSheet`                      | A growth-focused, secondary feature, perfect for the More menu.            |
