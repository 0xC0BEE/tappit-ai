# Tappit AI: Responsive Intro Site Plan

This document outlines the plan for creating a public-facing website for Tappit AI. The primary goal is to effectively communicate our unique value proposition (AI-powered networking) and convert visitors into active beta users of the web application.

### 1. Project Goal & Target Audience

*   **Primary Goal:** User Acquisition. Drive sign-ups for the Tappit AI beta.
*   **Secondary Goal:** Brand Building. Establish Tappit AI as the most innovative and intelligent player in the digital business card space.
*   **Target Audience:** Tech-savvy professionals, sales teams, marketers, and founders who value efficiency and cutting-edge technology.

### 2. Inspiration Analysis: `tappitcards.com`

*   **Strengths:**
    *   Clean, professional design.
    *   Clear, prominent calls-to-action ("Design Your Card").
    *   Effective use of product imagery and videos.
    *   Simple, easy-to-understand navigation.
*   **Weaknesses:**
    *   Feels corporate and generic; lacks a strong personality.
    *   No mention of advanced software features or AI. The focus is almost entirely on the physical product.
    *   Does not communicate a "delightful" user experience.
*   **Our Opportunity:** We can build a site that is not only visually stunning but also tells a compelling story about how AI is revolutionizing networking, a story our competitors are not telling.

### 3. Proposed Site Structure & User Flow

The site will be a single-page scrolling experience for the main landing page, with separate pages for login/signup.

**User Flow:**
`Visitor Lands on Site` -> `Clicks "Get Started Free"` -> `Sign Up Page` -> `Redirect to Web App` -> `Begin Onboarding Flow`

**Key Sections (Landing Page):**

1.  **Hero Section:**
    *   **Headline:** "Stop Networking. Start Connecting." or "The Business Card, Reimagined by AI."
    *   **Visual:** An interactive, 3D-tilting `TiltCardPreview` component, showcasing the glassmorphism and bamboo theme.
    *   **CTA:** "Create Your Free AI Card"

2.  **"What if your card could...?" Section:**
    *   A grid of three feature highlights that showcase our AI capabilities.
    *   "Polish your title instantly." (AI Polish)
    *   "Suggest the perfect icebreaker." (Icebreaker Gem)
    *   "Build itself from a simple prompt." (Create Gem)

3.  **AI Studio Showcase:**
    *   A larger, more detailed section explaining the "Gems" concept.
    *   An animated visual showing gems being dragged onto a card.

4.  **Team Functionality:**
    *   A section dedicated to team features (Brand Kit, Analytics).
    *   Use visuals of the team dashboard.

5.  **The "Delight" Section:**
    *   Highlight the Green Streak and our commitment to sustainability.
    *   Mention the haptics and spring physics that make the app feel great.

6.  **Final Call-to-Action:**
    *   A final, prominent "Sign Up for Beta" section before the footer.

### 4. Tech Stack & Design

*   **Tech Stack:**
    *   **Framework:** Astro or Next.js (Static Site Generation for top performance and SEO).
    *   **Styling:** Tailwind CSS.
    *   **Animations:** Framer Motion for sophisticated scroll-based animations.
*   **Design Language:**
    *   **Visuals:** Must be perfectly aligned with the app's aesthetic: Bamboo background, `GlassCard` elements, glowing green CTAs.
    *   **Typography:** Use the "Bamboo" font for all major headings.
    *   **Interactivity:** The site should feel as fluid and responsive as the app itself. Use the `useTilt` hook on visuals.

### 5. Next Steps

1.  Design high-fidelity mockups in Figma.
2.  Develop the site as a separate project within our monorepo.
3.  Connect the "Sign Up" form to our authentication provider (e.g., Supabase Auth).
4.  Deploy the site to a performant hosting platform like Vercel or Netlify.
