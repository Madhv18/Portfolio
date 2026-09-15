# AGENTS.md

## Project

This project is a premium, interactive 3D-inspired portfolio website for Madhv Darji, a software developer.

The portfolio should combine:

* Strong creative direction
* 3D-inspired visual presentation
* Large typography
* Smooth scroll-based interactions
* High-quality project showcases
* Clear professional content
* Excellent responsive behavior

The visual direction is inspired by the supplied reference portfolio, but the implementation must use original project content and should not blindly copy the reference identity.

## Primary Objective

Build a polished, production-quality portfolio that feels like a creative digital experience rather than a conventional resume website.

The website should communicate that Madhv is a software developer who builds responsive, full-stack, and AI-powered applications.

## Technology Stack

Use the following technologies unless a change is explicitly approved:

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React
* Google Fonts: Kanit

Do not introduce unnecessary libraries.

## Development Rules

1. Use TypeScript throughout the project.
2. Prefer reusable, composable React components.
3. Keep content and project data separate from presentation components.
4. Use data-driven rendering for repeated elements such as services and projects.
5. Use Tailwind CSS for styling.
6. Use Framer Motion for entrance animations, scroll animations, and interactive motion.
7. Keep the code readable and maintainable.
8. Avoid large monolithic components.
9. Do not duplicate the same animation or button implementation across sections.
10. Use semantic HTML where appropriate.
11. Add accessible labels to interactive elements and meaningful alt text to images.
12. Ensure keyboard users can navigate the website.
13. Respect `prefers-reduced-motion` where practical.
14. Avoid horizontal page overflow.
15. Do not add authentication, backend services, CMS, or database functionality unless explicitly requested.

## Design Rules

The design specification in `DESIGN_SYSTEM.md` is the primary source of truth for the visual implementation.

Follow:

* Exact colors
* Typography
* Section order
* Responsive breakpoints
* Spacing
* Border radii
* Animation behavior
* Image layout
* Button styling

Do not replace the specified design with a generic portfolio template.

If a requirement is ambiguous:

1. Preserve the existing visual direction.
2. Choose the simplest maintainable implementation.
3. Avoid inventing unrelated features.
4. Ask for clarification only when the decision materially affects the design or functionality.

## Content Rules

The content in `CONTENT.md` is the source of truth for personal information.

Use Madhv's actual resume-based information.

Do not:

* Invent employment experience
* Invent project metrics
* Invent client names
* Invent awards
* Invent social links
* Claim technologies that are not provided
* Add fake testimonials
* Add fake project descriptions
* Present placeholder content as real information

Use placeholders for missing URLs or images until they are provided.

## Image Rules

The project will initially use temporary or supplied visual assets.

The actual hero photo will be selected after the website layout is built.

Do not:

* Invent a personal photo
* Generate a portrait that is presented as Madhv without an approved reference image
* Replace supplied project image URLs unnecessarily
* Download or duplicate external assets unless required
* Use copyrighted assets in a way that implies ownership

Use `object-cover`, lazy loading, and appropriate image sizing for remote images.

## Animation Rules

Animations should feel smooth, intentional, and premium.

Avoid:

* Excessive animation
* Constant distracting motion
* Animations that block interaction
* Scroll handlers that cause unnecessary re-renders
* Motion that makes the website difficult to read

Use Framer Motion's `motion`, `useScroll`, `useTransform`, and related APIs where appropriate.

## Responsive Rules

Use a mobile-first approach.

Support:

* Small mobile screens
* Large mobile screens
* Tablets
* Desktop
* Ultra-wide screens

Use Tailwind's default breakpoints:

* `sm`
* `md`
* `lg`
* `xl` when useful

Use fluid typography with `clamp()` where specified.

Test for:

* Text overflow
* Image cropping
* Sticky card behavior
* Navbar spacing
* Marquee overflow
* Touch interaction
* Reduced screen widths

## Performance Rules

1. Avoid unnecessary scroll listeners.
2. Use passive scroll listeners when manually listening to scroll.
3. Use `will-change` only where useful.
4. Lazy-load non-critical images.
5. Avoid rendering excessive duplicate DOM when not necessary.
6. Keep animations GPU-friendly.
7. Avoid expensive layout calculations on every frame.
8. Do not sacrifice usability for visual effects.

## Component Expectations

Create reusable components such as:

* `Navbar`
* `FadeIn`
* `Magnet`
* `ContactButton`
* `LiveProjectButton`
* `AnimatedText`
* `MarqueeSection`
* `AboutSection`
* `ServicesSection`
* `ProjectsSection`
* `ProjectCard`

Component names may be adjusted if a better architecture is necessary, but avoid unnecessary complexity.

## Verification

After implementation or a major change:

1. Run the development server.
2. Check that the application builds successfully.
3. Check the browser console for errors.
4. Verify all sections render in the correct order.
5. Verify responsive layouts.
6. Verify external images load or have graceful fallbacks.
7. Verify navigation links work.
8. Verify animations do not cause layout overflow.
9. Fix errors before moving to the next phase.

## Working Style

Implement the project incrementally.

Do not attempt to replace the entire architecture when a small change is sufficient.

Before adding a new dependency, check whether the existing stack can solve the problem.

Keep the implementation faithful to the design specification while maintaining clean, production-quality code.
