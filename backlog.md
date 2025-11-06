# Tappit AI: Beta Backlog

This document tracks all known bugs, incomplete features, and areas for improvement. It is a living document, prioritized to ensure we ship a stable and delightful beta.

**Priorities:**
*   **P0:** Beta Blocker. Critical bug that prevents core functionality or crashes the app.
*   **P1:** High Priority. Major bug or missing feature that significantly impacts the user experience.
*   **P2:** Polish / Feature Completion. Incomplete features, UI bugs, or UX enhancements.
*   **P3:** Technical Debt / Future. Long-term improvements, refactoring, and post-beta features.

---

### P0: Blockers (Must Fix for Beta)

*   **[UX-08] Layout Overlap:** Content on multiple screens (`CardBuilderScreen`, `HomeScreen`, `TeamScreen`) scrolls behind the fixed bottom navigation bar, making UI elements inaccessible. This is a critical, recurring layout failure that breaks usability.
*   **[UX-06] Dropdown `z-index` Failure:** The custom dropdown menu (e.g., in "Brand Font") renders *behind* other components on the page, making it unusable. This is a critical UI regression.

### P1: High Priority Bugs & Features

*   **[B-11] Inoperable Buttons on Team Screen:** The "Invite" and "Customize" buttons in the Team Hub header are not fully implemented. "Invite" should open a functional modal.
*   **[B-12] "Scan" Quick Action Does Not Open Camera:** The "Scan" button on the Home Screen only shows an alert. It must trigger the device's camera to scan a QR code.
*   **[B-10] Video Embed Shows Configuration Error:** The video player modal displays a "Video player configuration error" instead of playing the video. This breaks a key card feature.
*   **[FE-06] Implement Public Card "Save Contact" Functionality:** The "Save to Contacts" button on the public card page is a placeholder. It needs to generate and download a standard `.vcf` file.
*   **[FE-01] Implement Real Lottie Player:** The onboarding animation is a static SVG placeholder. A real Lottie player needs to be implemented to provide the intended "love-at-first-tap" animation.
*   **[UX-07] Card Preview Missing in Card Builder Mobile View:** On mobile screens, the Card Builder's "Preview" tab is empty, preventing users from seeing their card as they edit.
*   **[UX-09] Brand Kit Upload and Preview is Incomplete:** The "Upload Logo" functionality is simulated. The live preview is too small to be useful. Needs a real file upload and a larger preview modal.

### P2: Polish & Feature Completion



### P3: Technical Debt & Future Enhancements

*   **[TECH-02] Optimize Color Extractor:** The `useColorExtractor` hook runs on the client and can be slow. This could be moved to a serverless function for better performance.