# Tappit AI: Full-Stack QA Backlog

This document tracks all identified bugs, UX flaws, and code health issues found during the full-stack QA audit of the Tappit AI application.

---

### P0: Critical Bugs

*   **[Critical] Security Vulnerability (XSS) in "Create Gem" Feature**
    *   **Severity:** Critical
    *   **Page / Component:** `gems/CustomGemComponent.tsx`
    *   **Steps to reproduce:**
        1. As a logged-in user, navigate to the Card Builder screen.
        2. On the right-hand "AI Studio" sidebar (desktop view), click "Create Gem".
        3. Enter a malicious prompt designed to generate HTML with an XSS vector that bypasses the simple sanitizer (e.g., an `<img>` tag with an `onerror` attribute, or an SVG with an embedded `<script>`).
        4. The generated JSX is rendered using `dangerouslySetInnerHTML`, which could execute malicious scripts in the user's browser, leading to session hijacking or other attacks.
    *   **Fix Suggestion:** The `sanitizeHtml` function needs to be more robust. It should be expanded to strip out not just `<script>` tags and `on*` attributes, but also other potential vectors like `href="javascript:..."`, `src` attributes on non-image tags, and embedded scripts within SVGs. For a true production environment, a sandboxed `iframe` or a server-side JSX parser would be required, but strengthening the client-side sanitizer is a critical immediate step.
    *   **File:** `gems/CustomGemComponent.tsx`

---

### P1: UX & Code Health Flaws

*   **[Medium] Misleading Component Name: `LottiePlayer.tsx`**
    *   **Severity:** Medium
    *   **Page / Component:** `components/LottiePlayer.tsx`, `screens/OnboardingScreen.tsx`
    *   **Steps to reproduce:**
        1. A developer inspects the `OnboardingScreen` and sees a `LottiePlayer` component.
        2. They open the file expecting to see a Lottie animation implementation.
        3. The file explicitly states "Lottie is banned" and contains a simple Framer Motion animation on an SVG icon.
    *   **Fix Suggestion:** Rename the component from `LottiePlayer.tsx` to something that accurately describes its function, such as `PulsingTreeAnimation.tsx`, to avoid developer confusion and improve code clarity. Update the import in `OnboardingScreen.tsx`.
    *   **File:** `components/LottiePlayer.tsx`

*   **[Low] Obsolete/Empty Placeholder Files**
    *   **Severity:** Low
    *   **Page / Component:** Project-wide
    *   **Steps to reproduce:**
        1. Browse the project file structure.
        2. Observe numerous empty `.md` files (`competitor_analysis.md`, etc.).
        3. Observe numerous empty `.ts` or `.tsx` files whose only purpose was to fix a previous JSX namespace bug (e.g., `data/contacts.ts`, `hooks/useSupabase.ts`, `components/intro/FeaturesSection.tsx`).
    *   **Fix Suggestion:** Delete all of these obsolete files. They add clutter to the repository, increase cognitive load for developers, and serve no functional purpose now that the root TypeScript/JSX issues have been resolved.
    *   **Files:** `competitor_analysis.md`, `intro_site_plan.md`, `future_roadmap.md`, `POST_BETA_S_PLAN.md`, `data/contacts.ts`, `data/templates.ts`, `data/team.ts`, `data/analytics.ts`, `hooks/useSupabase.ts`, `components/intro/FeaturesSection.tsx`, `components/intro/GreenStreakSection.tsx`, `components/intro/JoinBetaSection.tsx`.

*   **[Low] Redundant "Fix:" Code Comments**
    *   **Severity:** Low
    *   **Page / Component:** Project-wide
    *   **Steps to reproduce:**
        1. Read through various component files (`index.tsx`, `App.tsx`, `gems/*.tsx`, etc.).
        2. Notice many comments like `// Fix: Remove redundant triple-slash directive...` or `// Fix: Use namespace import for React...`.
    *   **Fix Suggestion:** Now that the TypeScript and JSX configuration is stable, these comments are historical noise. A global find-and-replace should be used to remove all of these now-obsolete comments to improve code readability.
    *   **Files:** Project-wide.