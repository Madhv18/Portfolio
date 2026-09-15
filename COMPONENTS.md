# Component Architecture

## Purpose

This document defines the reusable components, responsibilities, behavior, and implementation rules for the 3D personal portfolio website.

The website should be built with reusable React and TypeScript components rather than placing the entire page inside one large component.

---

## Core Principles

- Use functional React components.
- Use TypeScript for all components and props.
- Keep components small and focused.
- Prefer reusable components over duplicated markup.
- Keep personal content separate from layout and styling.
- Use accessible semantic HTML.
- Avoid unnecessary global state.
- Avoid excessive 3D effects that reduce performance or readability.
- Respect `prefers-reduced-motion`.
- Ensure every interactive element works with keyboard navigation.
- Use responsive layouts for mobile, tablet, and desktop.
- Do not invent personal information, project details, achievements, or links.
- All personal content must come from `CONTENT.md` and the user's resume.

---

## Suggested Folder Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageContainer.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Marquee.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── FadeIn.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── AnimatedText.tsx
│   │   └── ProjectCard.tsx
│   │
│   └── three/
│       ├── HeroScene.tsx
│       ├── FloatingObject.tsx
│       └── ThreeErrorBoundary.tsx
│
├── data/
│   └── portfolio.ts
│
├── lib/
│   └── utils.ts
│
└── public/
    ├── images/
    └── models/
```

The exact folder structure may be adjusted to match the selected framework and project setup.

---

# Layout Components

## Navbar

### Responsibility

Provides primary navigation and branding.

### Features

- Displays the portfolio name or personal brand.
- Includes links to:
  - Home
  - About
  - Services or Skills
  - Projects
  - Contact
- Uses smooth scrolling for in-page navigation.
- Changes appearance subtly when the user scrolls.
- Includes a mobile navigation menu.
- Closes the mobile menu after selecting a link.
- Maintains sufficient contrast.
- Supports keyboard navigation.

### Props

```ts
type NavbarProps = {
  links?: {
    label: string;
    href: string;
  }[];
};
```

---

## Footer

### Responsibility

Displays closing information and external links.

### Features

- Copyright or current year.
- LinkedIn link.
- GitHub link.
- Email or contact link if available.
- Short closing statement.
- External links open safely.
- Does not display unavailable or invented links.

### Props

```ts
type FooterProps = {
  name: string;
  linkedinUrl?: string;
  githubUrl?: string;
  email?: string;
};
```

---

## PageContainer

### Responsibility

Provides consistent page width, horizontal padding, and alignment.

### Features

- Responsive max-width.
- Consistent left and right spacing.
- Prevents horizontal overflow.
- Supports optional custom class names.

---

# Section Components

## Hero

### Responsibility

Creates the main first impression of the portfolio.

### Content

- Greeting or introduction.
- User's real name.
- Professional title based on the resume.
- Short personal description.
- Primary call-to-action.
- Secondary call-to-action.
- Decorative 3D visual or animated object.
- Optional availability statement.

### Behavior

- Uses subtle entrance animation.
- Animates headline or supporting text.
- Includes a clear visual hierarchy.
- Keeps important text visible even if 3D rendering fails.
- Does not require the user to interact with the 3D object.
- Avoids excessive animation behind text.

### Props

```ts
type HeroProps = {
  name: string;
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
};
```

---

## Marquee

### Responsibility

Displays a scrolling strip of technologies, skills, services, or keywords.

### Features

- Smooth horizontal movement.
- Repeated content for a continuous loop.
- Pauses or reduces motion when appropriate.
- Does not contain essential information that is unavailable elsewhere.
- Supports responsive font sizing.

### Props

```ts
type MarqueeProps = {
  items: string[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
};
```

---

## About

### Responsibility

Presents the user's professional background and personal approach.

### Content

- Short biography based on the resume.
- Education or experience highlights when relevant.
- Professional interests.
- Working approach.
- Optional statistics only when supported by the resume.

### Rules

- Do not exaggerate experience.
- Do not create fake years of experience.
- Do not add unsupported achievements.
- Keep the section concise and readable.
- Use visual cards only when they improve comprehension.

---

## Expertise or Services

### Responsibility

Displays the user's actual skills, services, and areas of expertise in a premium, editorial list/grid layout.

### Rules

- Use a dark visual system (#0C0C0C).
- Desktop: Use an editorial, asymmetric list/grid rather than generic service cards.
- Mobile: Use an interactive, swipable single-item carousel to conserve vertical space.
- Add large index numbers and clear headings.
- Add subtle hover interactions on desktop.
- Avoid excessive rounded cards, neon effects, or generic layouts.
- Only display expertise areas supported by the resume or user-provided information.

### Props

```ts
type ExpertiseItem = {
  id: string;
  title: string;
  description: string;
};

type ExpertiseProps = {
  items: ExpertiseItem[];
};
```

---

## Contact

### Responsibility

Displays the final call to action for the portfolio, featuring a large "Let's Work Together" heading and a primary email button.

### Rules

- Use a dark visual system (#0C0C0C).
- Use `MagneticButton` for the email link on desktop.
- Keep supporting copy minimal.
- Do NOT implement a fake form.
- Use `mailto:` for the email action.

---

## Projects

### Responsibility

Displays selected projects in a visually attractive but informative layout.

### Features

- Project title.
- Short description.
- Technology stack.
- Project image or visual.
- GitHub link when available.
- Live demo link when available.
- Project status if relevant.
- Hover animation.
- Responsive card layout.

### Rules

- Use real projects from the user's resume or supplied information.
- Do not invent project URLs.
- Do not show fake metrics.
- If a project has no image, use a tasteful generated visual or gradient placeholder.
- Ensure project information remains readable without hover.
- Use external-link indicators for external URLs.

### Props

```ts
type Project = {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

type ProjectsProps = {
  projects: Project[];
};
```

---

## Contact

### Responsibility

Provides a clear way for visitors to contact the user.

### Features

- Email link if available.
- LinkedIn link.
- GitHub link.
- Optional contact call-to-action.
- No backend contact form unless explicitly implemented later.
- Clear fallback if an email address is unavailable.

### Rules

- Do not display placeholder contact information in the final website.
- Do not create a fake contact form that appears functional but does not send messages.
- Use `mailto:` only when a real email address is available.

---

# Reusable UI Components

## Button

### Responsibility

Provides consistent primary, secondary, and text button styles.

### Variants

```ts
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "text";
```

### Features

- Supports internal links.
- Supports external links.
- Supports buttons.
- Includes hover and focus states.
- Includes disabled state.
- Has accessible text.
- Does not rely only on color to communicate state.

---

## SectionHeading

### Responsibility

Provides consistent section titles and descriptions.

### Props

```ts
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};
```

---

## FadeIn

### Responsibility

Adds a reusable entrance animation to content.

### Features

- Supports fade and vertical movement.
- Uses viewport detection.
- Animates once by default.
- Avoids large movement distances.
- Respects reduced-motion preferences.

### Props

```ts
type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
};
```

---

## AnimatedText

### Responsibility

Animates headings or short text phrases.

### Rules

- Do not animate every paragraph.
- Do not hide important content permanently.
- Keep animation short and subtle.
- Provide readable content when animations are disabled.
- Avoid excessive character-by-character animation on mobile.

---

## MagneticButton

### Responsibility

Adds a subtle cursor-following effect to selected buttons or links.

### Rules

- Use only for desktop pointer devices.
- Disable on touch devices.
- Keep movement small.
- Preserve the actual clickable area.
- Do not make navigation difficult.
- Respect reduced-motion preferences.

---

## ProjectCard

### Responsibility

Displays one project consistently.

### Features

- Image or visual area.
- Project title.
- Description.
- Technology tags.
- Links.
- Hover effect.
- Focus-visible effect.
- Responsive layout.

### Rules

- Entire card should not become an inaccessible clickable region.
- Links must have descriptive labels.
- Images must include useful alt text.
- Avoid excessive 3D transforms that affect readability.

---

# 3D Components

## HeroScene

### Responsibility

Renders the primary 3D visual in the hero section.

### Possible Technology

Use React Three Fiber and Drei only if they provide real value and can be installed reliably.

### Rules

- The 3D scene is decorative, not essential.
- The page must remain usable if WebGL is unavailable.
- Keep geometry and textures lightweight.
- Avoid unnecessary large 3D models.
- Use a limited number of lights.
- Avoid expensive post-processing by default.
- Use lazy loading where possible.
- Provide a static fallback for mobile or low-power devices.
- Do not block the initial page render.
- Ensure the 3D object does not cover important text or buttons.

---

## FloatingObject

### Responsibility

Renders a simple decorative 3D object or animated visual.

### Rules

- Use simple geometry where possible.
- Keep animation slow and smooth.
- Avoid constant rapid rotation.
- Use subtle floating movement.
- Ensure the object remains within its container.
- Disable or reduce animation for reduced-motion users.

---

## ThreeErrorBoundary

### Responsibility

Prevents a WebGL or 3D rendering failure from breaking the entire page.

### Behavior

If the 3D scene fails:

- Display a static fallback visual.
- Keep the hero text and buttons functional.
- Log the error during development.
- Do not show technical error details to normal visitors.

---

# Animation Rules

## General Motion

- Use motion to support hierarchy and interaction.
- Avoid animation that distracts from content.
- Use consistent easing.
- Keep entrance animations short.
- Avoid animating large sections continuously.
- Avoid scroll-jacking.
- Avoid forced delays before content becomes readable.

## Reduced Motion

The website must respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* Reduce or disable non-essential animation */
}
```

When reduced motion is enabled:

- Disable magnetic effects.
- Disable continuous 3D movement where possible.
- Remove marquee movement or make it static.
- Use simple opacity transitions.
- Keep all content immediately accessible.

---

# Accessibility Requirements

Every component must:

- Use semantic HTML.
- Include visible focus states.
- Support keyboard navigation.
- Use descriptive link labels.
- Include alt text for meaningful images.
- Use empty alt text for decorative images.
- Maintain sufficient color contrast.
- Avoid relying only on hover.
- Avoid flashing or rapidly changing visuals.
- Include accessible labels for icon-only buttons.
- Use appropriate heading hierarchy.
- Ensure mobile menus are accessible.
- Ensure external links are clearly indicated when useful.

---

# Responsive Requirements

## Mobile

- Single-column layout where appropriate.
- Simplified navigation.
- Reduced 3D complexity.
- Smaller typography and spacing.
- Buttons remain easy to tap.
- No horizontal scrolling.
- Project cards stack vertically.
- Decorative visuals must not obscure content.

## Tablet

- Use two-column layouts where appropriate.
- Preserve readable line lengths.
- Maintain balanced spacing.
- Use moderate animation and 3D effects.

## Desktop

- Use wider layouts and grid compositions.
- Enable subtle cursor-based effects where appropriate.
- Use larger 3D visuals without harming performance.
- Maintain a clear reading order.

---

# Data and Content Rules

Personal content should be stored separately from components.

Recommended file:

```text
src/data/portfolio.ts
```

Example:

```ts
export const portfolio = {
  name: "Your Name",
  title: "Your Professional Title",
  description: "Your real professional introduction.",
  socialLinks:
  linkedin: "https://www.linkedin.com/in/madhv-darji/"
  github: "https://github.com/Madhv18"
  },
  skills: [],
  projects: [],
};
```

The actual values must be filled from the user's resume and provided links.

Components should receive content through props or imported structured data rather than hardcoding personal information throughout the UI.

---

# Component Completion Checklist

Before considering a component complete:

- [ ] Uses TypeScript.
- [ ] Has a clear single responsibility.
- [ ] Works on mobile and desktop.
- [ ] Has accessible markup.
- [ ] Has visible focus states.
- [ ] Does not contain invented personal information.
- [ ] Does not create horizontal overflow.
- [ ] Handles missing optional data.
- [ ] Respects reduced-motion preferences.
- [ ] Does not produce console errors.
- [ ] Uses reusable styles and utilities.
- [ ] Does not unnecessarily reduce performance.