# Design System

## 1. Overview

Build a premium, interactive 3D-inspired developer portfolio using:

* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React
* Kanit Google Font

The design should be inspired by the supplied reference portfolio while using Madhv Darji's identity and resume-based content.

## 2. Page Metadata

**Page title:**

`Madhv Darji — Software Developer`

The title may be adjusted later if a stronger final identity is chosen.

## 3. Global Styles

### Colors

```css
--background: #0C0C0C;
--light-text: #D7E2EA;
--white: #FFFFFF;
--dark-text: #0C0C0C;
```

### Global Background

Apply `#0C0C0C` to:

* `html`
* `body`
* `#root`
* Main wrapper

### Font

Use Google Fonts:

`Kanit`

Weights:

`300, 400, 500, 600, 700, 800, 900`

```css
font-family: 'Kanit', sans-serif;
```

### Reset

```css
* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  padding: 0;
  background: #0C0C0C;
}
```

### Main Wrapper

The main wrapper must use:

```css
overflow-x: clip;
```

### Hero Heading

Create a reusable `.hero-heading` class:

```css
.hero-heading {
  background: linear-gradient(
    180deg,
    #646973 0%,
    #BBCCD7 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## 4. Section Order

The page must render sections in this order:

1. `HeroSection`
2. `MarqueeSection`
3. `AboutSection`
4. `ServicesSection`
5. `ProjectsSection`

A footer or contact area may be added later if required.

## 5. Reusable Components

Create reusable components:

* `FadeIn`
* `Magnet`
* `ContactButton`
* `LiveProjectButton`
* `AnimatedText`
* `Navbar`
* `ProjectCard`

Use data-driven rendering for repeated content.

## 6. FadeIn Component

Create a reusable Framer Motion wrapper.

### Behavior

Use `whileInView`.

```tsx
viewport={{
  once: true,
  margin: "50px",
  amount: 0
}}
```

### Defaults

* `delay`: configurable
* `duration`: `0.7`
* `x`: `0`
* `y`: `30`

### Easing

```tsx
[0.25, 0.1, 0.25, 1]
```

### Animation

Initial state:

```tsx
{
  opacity: 0,
  x,
  y
}
```

Animate to:

```tsx
{
  opacity: 1,
  x: 0,
  y: 0
}
```

Use `motion.create()` or an equivalent safe implementation for dynamic element types.

## 7. ContactButton

### Label

`Contact Me`

### Appearance

* Rounded-full pill
* White text
* Font-medium
* Uppercase
* Tracking-widest

### Background

```css
linear-gradient(
  123deg,
  #18011F 7%,
  #B600A8 37%,
  #7621B0 72%,
  #BE4C00 100%
)
```

### Shadows

```css
box-shadow:
  0px 4px 4px rgba(181, 1, 167, 0.25),
  4px 4px 12px #7721B1 inset;
```

### Outline

Use a white 2px outline with a -3px offset.

### Sizes

```text
px-8 py-3
sm:px-10 sm:py-3.5
md:px-12 md:py-4
```

### Typography

```text
text-xs
sm:text-sm
md:text-base
```

### Behavior

The button should link to the contact destination, initially email or a future contact section.

## 8. LiveProjectButton

### Label

`Live Project`

### Appearance

* Rounded-full
* Border-2
* Border color `#D7E2EA`
* Text color `#D7E2EA`
* Font-medium
* Uppercase
* Tracking-widest

### Sizes

```text
px-8 py-3
sm:px-10 sm:py-3.5
```

### Typography

```text
text-sm
sm:text-base
```

### Hover

```css
background: rgba(215, 226, 234, 0.1);
```

## 9. Magnet Component

Create a mouse-following magnetic hover effect.

### Behavior

* Track mouse position relative to the element center.
* Apply a `translate3d` transform.
* Divide movement by the strength factor.
* Activate when the cursor is within the configured padding distance from the element edge.
* Smoothly transition into the magnetic state.
* Smoothly return to the original position when inactive.

### Settings

```tsx
padding={150}
strength={3}
activeTransition="transform 0.3s ease-out"
inactiveTransition="transform 0.6s ease-in-out"
```

### Performance

Use:

```css
will-change: transform;
```

Avoid unnecessary state updates on every mouse movement.

## 10. Hero Section

### Layout

* Full viewport height
* `h-screen`
* Flex column
* `overflow-x: clip`
* Background `#0C0C0C`

### Navbar

Horizontal navigation with:

* About
* Price
* Projects
* Contact

Use `justify-between`.

### Navbar Styling

* Text color `#D7E2EA`
* Font-medium
* Uppercase
* Tracking-wider

### Sizes

```text
text-sm
md:text-lg
lg:text-[1.4rem]
```

### Padding

```text
px-6
md:px-10
pt-6
md:pt-8
```

### Hover

Opacity 70% with a 200ms transition.

### Hero Heading

Text:

`Hi, I'm Madhv`

Use the `.hero-heading` class.

### Heading Styling

* Font-black
* Uppercase
* Tracking-tight
* Leading-none
* Whitespace-nowrap
* Full width

### Sizes

```text
text-[14vw]
sm:text-[15vw]
md:text-[16vw]
lg:text-[17.5vw]
```

### Positioning

```text
mt-6
sm:mt-4
md:-mt-5
```

Wrap the heading in an overflow-hidden container.

### Bottom Bar

Use:

* Flexbox
* `justify-between`
* `items-end`

Padding bottom:

```text
pb-7
sm:pb-8
md:pb-10
```

### Left Text

Text:

`a software developer driven by building thoughtful, responsive, and unforgettable digital experiences`

Styling:

* Color `#D7E2EA`
* Font-light
* Uppercase
* Tracking-wide
* Leading-snug

Font size:

```css
clamp(0.75rem, 1.4vw, 1.5rem)
```

Max width:

```text
max-w-[160px]
sm:max-w-[220px]
md:max-w-[260px]
```

### Portrait / Hero Visual

Use a temporary visual initially.

The final photo or custom hero visual will be selected after the layout is built.

When the supplied reference image is used temporarily, preserve the specified positioning:

```text
absolute
left-1/2
-translate-x-1/2
z-10
```

### Width

```text
w-[280px]
sm:w-[360px]
md:w-[440px]
lg:w-[520px]
```

### Mobile Position

```text
top-1/2
-translate-y-1/2
```

### Larger Screens

```text
sm:top-auto
sm:translate-y-0
sm:bottom-0
```

Wrap the visual in `Magnet`.

### Hero Animation Delays

* Navbar: delay `0`, y `-20`
* Heading: delay `0.15`, y `40`
* Left text: delay `0.35`, y `20`
* Contact button: delay `0.5`, y `20`
* Portrait: delay `0.6`, y `30`

## 11. Marquee Section

### Layout

Two rows of images that move horizontally based on page scroll position.

### Background

`#0C0C0C`

### Padding

```text
pt-24
sm:pt-32
md:pt-40
pb-10
```

### Image Data

Use the supplied motionsites.ai GIF URLs.

#### Row 1

Use the first 11 images:

1. `https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif`
2. `https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif`
3. `https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif`
4. `https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif`
5. `https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif`
6. `https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif`
7. `https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif`
8. `https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif`
9. `https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif`
10. `https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif`
11. `https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif`

Triple the row for seamless scrolling.

### Row 2

Use the remaining 10 images:

1. `https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif`
2. `https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif`
3. `https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif`
4. `https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif`
5. `https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif`
6. `https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif`
7. `https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif`
8. `https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif`
9. `https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif`
10. `https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif`

Triple the row for seamless scrolling.

### Scroll Behavior

Calculate offset:

```tsx
(window.scrollY - sectionTop + window.innerHeight) * 0.3
```

Row 1 moves right:

```tsx
translateX(offset - 200)
```

Row 2 moves left:

```tsx
translateX(-(offset - 200))
```

Use a passive scroll listener.

### Image Tiles

```text
width: 420px
height: 270px
rounded-2xl
object-cover
loading="lazy"
```

### Gaps

```text
gap-3
```

Use `gap-3` between rows as well.

### Performance

Use:

```css
will-change: transform;
```

Avoid unnecessary React re-renders.

## 12. About Section

### Layout

* Full-height centered section
* `min-h-screen`
* Background `#0C0C0C`
* Relative positioning

### Padding

```text
px-5
sm:px-8
md:px-10
py-20
```

### Decorative Images

Use the supplied reference assets initially.

#### Top-left Moon

URL:

`https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png`

Sizes:

```text
w-[120px]
sm:w-[160px]
md:w-[210px]
```

Position:

```text
top-[4%]
left-[1%]
sm:left-[2%]
md:left-[4%]
```

Animation:

* delay `0.1`
* x `-80`
* y `0`
* duration `0.9`

#### Bottom-left 3D Object

URL:

`https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png`

Sizes:

```text
w-[100px]
sm:w-[140px]
md:w-[180px]
```

Position:

```text
bottom-[8%]
left-[3%]
sm:left-[6%]
md:left-[10%]
```

Animation:

* delay `0.25`
* x `-80`
* y `0`
* duration `0.9`

#### Top-right Lego

URL:

`https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png`

Sizes:

```text
w-[120px]
sm:w-[160px]
md:w-[210px]
```

Position:

```text
top-[4%]
right-[1%]
sm:right-[2%]
md:right-[4%]
```

Animation:

* delay `0.15`
* x `80`
* y `0`
* duration `0.9`

#### Bottom-right 3D Group

URL:

`https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png`

Sizes:

```text
w-[130px]
sm:w-[170px]
md:w-[220px]
```

Position:

```text
bottom-[8%]
right-[3%]
sm:right-[6%]
md:right-[10%]
```

Animation:

* delay `0.3`
* x `80`
* y `0`
* duration `0.9`

### About Heading

Text:

`About me`

Use `.hero-heading`.

Styling:

* Font-black
* Uppercase
* Leading-none
* Tracking-tight
* Centered

Font size:

```css
clamp(3rem, 12vw, 160px)
```

Animation:

* delay `0`
* y `40`

### Animated Paragraph

Use character-by-character scroll-driven opacity animation.

Text:

`With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!`

Important content adaptation:

The reference paragraph claims more than five years of design experience. Do not use that claim for Madhv unless it is confirmed.

Use the approved resume-based About paragraph from `CONTENT.md`.

### Paragraph Styling

* Color `#D7E2EA`
* Font-medium
* Centered
* Leading-relaxed
* Max width `560px`

Font size:

```css
clamp(1rem, 2vw, 1.35rem)
```

### Scroll Animation

Each character transitions from opacity `0.2` to `1`.

Use scroll progress based on the paragraph element.

Scroll offset:

```tsx
["start 0.8", "end 0.2"]
```

Use invisible placeholders and absolutely positioned animated spans where necessary to preserve layout.

### Spacing

Heading/text gap:

```text
gap-10
sm:gap-14
md:gap-16
```

Text/button gap:

```text
gap-16
sm:gap-20
md:gap-24
```

Include `ContactButton` below the text.

## 13. Services Section

### Layout

White background:

`#FFFFFF`

Rounded top corners:

```text
rounded-t-[40px]
sm:rounded-t-[50px]
md:rounded-t-[60px]
```

### Padding

```text
px-5
sm:px-8
md:px-10
py-20
sm:py-24
md:py-32
```

### Heading

Text:

`Expertise`

The original reference uses `Services`. Use `Expertise` for Madhv's developer positioning unless a later decision changes it.

Styling:

* Color `#0C0C0C`
* Font-black
* Uppercase
* Centered

Font size:

```css
clamp(3rem, 12vw, 160px)
```

Margin bottom:

```text
mb-16
sm:mb-20
md:mb-28
```

### Service List

Use a vertical list.

Max width:

`max-w-5xl`

Centered.

### Service Items

Use the following five items from `CONTENT.md`:

1. Frontend Development
2. Full-Stack Development
3. AI-Powered Applications
4. UI Engineering
5. API & Database Integration

### Item Layout

Horizontal layout:

* Number on the left
* Name and description stacked on the right

### Number

* Font-black
* Color `#0C0C0C`

Font size:

```css
clamp(3rem, 10vw, 140px)
```

### Name

* Font-medium
* Uppercase

Font size:

```css
clamp(1rem, 2.2vw, 2.1rem)
```

### Description

* Font-light
* Leading-relaxed
* Max width `max-w-2xl`
* Opacity `0.6`

Font size:

```css
clamp(0.85rem, 1.6vw, 1.25rem)
```

### Separators

Use 1px borders:

```css
rgba(12, 12, 12, 0.15)
```

### Padding

```text
py-8
sm:py-10
md:py-12
```

### Animation

Use staggered FadeIn.

Each item delay:

```tsx
index * 0.1
```

## 14. Projects Section

### Layout

Dark background:

`#0C0C0C`

Rounded top corners:

```text
rounded-t-[40px]
sm:rounded-t-[50px]
md:rounded-t-[60px]
```

Pulled upward:

```text
-mt-10
sm:-mt-12
md:-mt-14
```

Use:

```text
z-10
```

### Heading

Text:

`Projects`

Use `.hero-heading`.

Styling:

* Font-black
* Uppercase
* Leading-none
* Tracking-tight
* Centered

Use the same fluid heading size as other major headings.

### Project Cards

Create three sticky-stacking project cards.

Each card scales down as the user scrolls past it.

Use Framer Motion:

* `useScroll`
* `useTransform`

### Sticky Container

Each card should be inside an:

```text
h-[85vh]
```

container.

Sticky position:

```text
top-24
md:top-32
```

### Scale

Total cards:

`3`

Target scale:

```tsx
1 - (totalCards - 1 - index) * 0.03
```

### Card Offset

```tsx
top: `${index * 28}px`
```

### Card Styling

```text
rounded-[40px]
sm:rounded-[50px]
md:rounded-[60px]
border-2
border-[#D7E2EA]
bg-[#0C0C0C]
p-4
sm:p-6
md:p-8
```

### Top Row

Include:

* Project number
* Category label
* Project name
* Live Project button

### Number

Use the same large number styling as the services section.

### Category Labels

Examples:

* Full-Stack
* AI / ML
* Academic

Use categories based on `CONTENT.md`.

### Live Project Button

Use `LiveProjectButton`.

If a project URL is not available, use a disabled or placeholder state rather than inventing a link.

### Bottom Image Grid

Two-column layout:

* Left column: 40%
* Right column: 60%

Left column:

* Two stacked images

Right column:

* One tall image

### Image Styling

All images use:

```text
rounded-[40px]
sm:rounded-[50px]
md:rounded-[60px]
object-cover
```

### Image Heights

Left top image:

```css
clamp(130px, 16vw, 230px)
```

Left bottom image:

```css
clamp(160px, 22vw, 340px)
```

### Project Data

Use three projects for the initial visual implementation.

#### Project 01 — Jeevan Deep Investment

Category:

`Full-Stack`

Use actual project screenshots when available.

Temporary image URLs may be used until screenshots are provided.

#### Project 02 — AI Resume Optimizer & Career Intelligence Platform

Category:

`AI / Full-Stack`

Use actual project screenshots when available.

Temporary image URLs may be used until screenshots are provided.

#### Project 03 — SMS Spam Classifier

Category:

`AI / Machine Learning`

Use actual project screenshots when available.

Temporary image URLs may be used until screenshots are provided.

### Important Project Content Rule

Do not use the reference project's names or images as if they belong to Madhv.

The reference CloudFront image URLs are not Madhv's project assets.

Use placeholders until actual screenshots are supplied.

## 15. Navigation

Navbar links should scroll to the relevant sections.

Suggested links:

* About
* Expertise
* Projects
* Contact

If the contact section does not exist initially, the Contact link may open the email CTA or be temporarily disabled until the contact area is implemented.

Use smooth scrolling where appropriate.

## 16. Responsive Design

Use mobile-first Tailwind breakpoints:

* `sm: 640px`
* `md: 768px`
* `lg: 1024px`

Use fluid typography and spacing.

Check:

* Hero heading overflow
* Portrait positioning
* Navbar spacing
* Marquee overflow
* Decorative image overlap
* About paragraph readability
* Services item stacking
* Project card image heights
* Sticky card behavior
* Touch usability

## 17. Accessibility

* Use semantic headings.
* Use meaningful alt text.
* Ensure buttons and links are keyboard accessible.
* Provide visible focus states.
* Do not rely only on hover.
* Respect reduced-motion preferences where practical.
* Ensure sufficient contrast.
* Avoid text that becomes unreadable over images.

## 18. Performance

* Lazy-load non-critical images.
* Use passive scroll listeners.
* Avoid unnecessary React state updates.
* Use `will-change: transform` only for animated elements.
* Keep image dimensions controlled.
* Avoid layout shifts where possible.
* Do not add unnecessary dependencies.

## 19. Implementation Priority

Build in this order:

1. Global styles and font
2. Component architecture
3. Hero section
4. Marquee section
5. About section
6. Expertise section
7. Projects section
8. Navigation and contact behavior
9. Responsive polish
10. Performance and accessibility verification
