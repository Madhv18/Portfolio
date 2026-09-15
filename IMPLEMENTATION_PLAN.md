# Implementation Plan

## Project

Madhv Darji — 3D-Inspired Developer Portfolio

## Development Approach

Build the portfolio incrementally.

Do not attempt to implement every animation and section in one uncontrolled step.

Each phase should produce a working application.

---

## Phase 1 — Foundation

### Goal

Set up the frontend project and establish the design system.

### Tasks

* Create React + TypeScript + Vite project if not already created.
* Configure Tailwind CSS.
* Install and configure Framer Motion.
* Install Lucide React.
* Add Kanit Google Font.
* Create global CSS reset.
* Set background colors.
* Create `.hero-heading`.
* Create main wrapper.
* Create initial folder structure.
* Create reusable component directory.
* Create content/data directory.
* Verify development server.

### Expected Result

A working application with the correct global styles and a clean component architecture.

---

## Phase 2 — Reusable Components

### Goal

Create shared components before building the sections.

### Tasks

* Build `FadeIn`.
* Build `Magnet`.
* Build `ContactButton`.
* Build `LiveProjectButton`.
* Build `AnimatedText`.
* Build `Navbar`.

### Expected Result

Reusable components that can be used consistently throughout the portfolio.

---

## Phase 3 — Hero Section

### Goal

Implement the first visual impression.

### Tasks

* Build navbar.
* Add hero heading.
* Add supporting text.
* Add temporary hero visual.
* Add ContactButton.
* Add FadeIn animations.
* Add Magnet interaction.
* Implement responsive positioning.
* Verify mobile and desktop layouts.

### Expected Result

A polished full-screen hero matching the design specification.

---

## Phase 4 — Marquee Section

### Goal

Create the scroll-responsive visual image section.

### Tasks

* Add all supplied GIF URLs.
* Split images into two rows.
* Triple each row for seamless scrolling.
* Implement scroll-based horizontal movement.
* Set opposite directions for the rows.
* Add image sizing and rounded corners.
* Add lazy loading.
* Add passive scroll handling.
* Verify performance and overflow.

### Expected Result

Two smooth image rows that respond to page scrolling.

---

## Phase 5 — About Section

### Goal

Introduce Madhv and his background.

### Tasks

* Add About heading.
* Add four decorative visual assets.
* Add resume-based About paragraph.
* Implement character-by-character scroll reveal.
* Add ContactButton.
* Add FadeIn animations.
* Verify paragraph readability on mobile.

### Expected Result

A visually rich About section with a smooth scroll-driven text reveal.

---

## Phase 6 — Expertise Section

### Goal

Present Madhv's core development capabilities.

### Tasks

* Redesign Expertise layout into a split cinematic composition.
* Left side: Add isolated `AvatarPlaceholder` ready for a future 3D GLB model.
* Right side: Add a 2-column expertise grid on desktop.
* Add six expertise items (including the added Deployment category).
* For each item: Index number, Lucide icon, title, concise description, and technology tags.
* Add thin dividers and staggered FadeIn animations.
* Ensure responsive layout: Desktop uses an editorial grid; Mobile uses an interactive single-item carousel.
* Mobile carousel: Swipe horizontally between items, includes Prev/Next controls and a progress indicator.

### Expected Result

A premium, editorial, dark-themed expertise section with an interactive avatar placeholder and a mobile-specific carousel.

---

## Phase 7 — Projects Section

### Goal

Create the main portfolio showcase.

### Tasks

* Add dark rounded project section.
* Add Projects heading.
* Create project data structure.
* Build reusable ProjectCard.
* Add sticky card containers.
* Implement scale-down stacking effect.
* Add project metadata.
* Add Live Project buttons.
* Add three-image project grids.
* Use temporary images until actual screenshots are provided.
* Verify mobile card layout.

### Expected Result

A visually impressive sticky project showcase.

---

## Phase 8 — Contact + Footer Final Design & Polish (Completed)

### Goal

Create a premium, professional Contact section and polished Footer.

### Tasks

* Add `Contact.tsx` with a large editorial CTA.
* Use `MagneticButton` for the email link.
* Refine `Footer.tsx` for minimal layout.
* Keep GitHub and LinkedIn as safe external anchors.
* Integrate Contact into `App.tsx` before Footer.
* Verify responsiveness and links.

### Expected Result

A cohesive and polished ending to the portfolio.

---

## Phase 9 — Visual Polish

### Goal

Improve the overall quality.

### Tasks

* Tune typography.
* Tune spacing.
* Tune animation timing.
* Improve image cropping.
* Check border radii.
* Check section transitions.
* Check sticky card overlap.
* Check mobile hero composition.
* Check ultra-wide layout.
* Add subtle hover states.
* Remove visual inconsistencies.

### Expected Result

A cohesive, premium portfolio experience.

---

## Phase 10 — Verification

### Goal

Ensure the website is reliable and ready for deployment.

### Tasks

* Run production build.
* Check browser console.
* Check broken images.
* Check responsive layouts.
* Check keyboard navigation.
* Check accessibility basics.
* Check reduced-motion behavior.
* Check page overflow.
* Check performance.
* Check all navigation links.
* Replace all TODO content.
* Confirm final project URLs.
* Add final hero photo or visual.

### Expected Result

A polished, functional, responsive portfolio ready for deployment.

---

## Future Enhancements

Only implement these after the initial portfolio is complete:

* Detailed project case-study pages
* Contact form
* Downloadable resume
* Custom 3D hero visual
* More advanced 3D interactions
* Blog section
* Theme switcher
* CMS integration
* Analytics
