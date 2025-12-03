# Design Guidelines: Colégio Estadual Tânia Varella - Student Projects Showcase

## Design Approach
**System-Based Approach** with educational platform inspiration (Google Classroom, Canvas aesthetic)
- Clean, card-focused interface emphasizing student work
- Organized, accessible layout suitable for educational content
- Professional yet approachable visual language

## Typography System
**Font Stack:** 
- Headers: Inter (700, 600 weights) - clean, modern, highly legible
- Body: Inter (400, 500 weights) - optimal for screen reading
- All via Google Fonts CDN

**Type Scale:**
- Hero Title (school name): text-4xl md:text-5xl lg:text-6xl, font-bold
- Section Headers (turma titles): text-3xl md:text-4xl, font-semibold
- Card Titles (project names): text-xl md:text-2xl, font-semibold
- Student Names: text-base md:text-lg, font-medium
- Body/Metadata: text-sm md:text-base, font-normal
- Links/CTAs: text-sm md:text-base, font-medium

## Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Consistent vertical rhythm: section padding py-16 md:py-20
- Card internal padding: p-6 md:p-8
- Grid gaps: gap-6 md:gap-8
- Element spacing: space-y-4, space-y-6

**Container Structure:**
- Max width: max-w-7xl mx-auto
- Horizontal padding: px-4 md:px-6 lg:px-8
- Project grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8

## Page Structure

### Header Section
- School logo placeholder (left-aligned)
- School name "Colégio Estadual Tânia Varella"
- Location subtitle "Maringá - PR"
- Class filter navigation (1C / 2C / Todos)
- Sticky header with subtle shadow on scroll
- Height: h-20 md:h-24

### Hero Section
- Modest hero (60vh on desktop, auto-height mobile)
- Centered content with school branding
- Title: "Projetos dos Alunos 2024"
- Subtitle introducing the showcase
- No background image - use solid treatment
- Call-to-action: "Ver Trabalhos" scroll indicator

### Project Cards Grid
**Card Anatomy (each project):**
- Screenshot preview area (aspect-ratio-video, 16:9)
- Project title (bold, prominent)
- Student names list (vertical stack with avatar placeholders)
- Project type/category badge
- Link buttons section:
  - "Ver no Replit" (primary)
  - "GitHub" (secondary, if available)
  - "Site Online" (accent, if available)
- Subtle border, rounded corners (rounded-xl)
- Hover elevation effect (shadow transition)

**Card Layout:**
- Preview image: w-full h-48 object-cover rounded-t-xl
- Content area: p-6 space-y-4
- Student list: flex flex-wrap gap-2 items-center
- Button group: flex gap-2 flex-wrap mt-4

### Class Sections
- Clear section dividers: "Turma 1C" / "Turma 2C"
- Section header with student count
- Brief description of class projects theme
- Margin between sections: mb-16 md:mb-20

### Footer
- School contact information
- Project year "2024"
- Credits to students and teachers
- Simple, single-column layout
- Padding: py-12

## Component Library

### Navigation Tabs (Class Filter)
- Horizontal tab list
- Active state with underline indicator (border-b-4)
- Smooth transitions
- Responsive: scroll on mobile, fixed on desktop

### Project Card
- Elevation: shadow-md default, shadow-xl on hover
- Border: border-2 with subtle treatment
- Transition: all transitions smooth (transition-all duration-300)
- Links open in new tab (target="_blank")

### Buttons
- Primary (Replit): Full rounded (rounded-full), medium padding (px-6 py-2.5)
- Secondary (GitHub): Outlined style, same padding
- Accent (Site): Solid fill with contrast
- Icon + text combination using Heroicons
- No hover backgrounds on images (not applicable here)

### Badges
- Project type indicator: Small pill (px-3 py-1 rounded-full text-xs)
- Positioned absolute on card preview (top-4 right-4)

### Student Name Display
- Avatar placeholder circle: w-8 h-8 rounded-full (initials inside)
- Name text alongside avatar
- Flex row layout with gap-2

## Icons
**Library:** Heroicons (outline style) via CDN
- Academic cap icon for header
- Link external icon for project links
- User group icon for student lists
- Code bracket icon for tech projects
- Plant/leaf icon for garden projects

## Images
**Hero Section:** No large hero image - use solid background with school emblem/logo if available

**Project Previews:**
- Screenshot placeholders for each Replit/deployed project
- Aspect ratio: 16:9 (aspect-video class)
- Fallback: gradient placeholder with project icon
- Lazy loading for performance

**Avatar Placeholders:**
- Circular colored backgrounds with student initials
- Consistent size: w-8 h-8 throughout

## Responsive Strategy
**Mobile (base):**
- Single column card grid
- Stacked navigation tabs (scrollable horizontal)
- Reduced padding values
- Simplified card layouts

**Tablet (md:):**
- Two-column card grid
- Expanded spacing
- Side-by-side elements in cards

**Desktop (lg:):**
- Three-column card grid
- Full spacing system
- Optimal reading widths (max-w-7xl)

## Accessibility
- Semantic HTML throughout (header, main, section, article for cards)
- ARIA labels for filter tabs
- Sufficient contrast ratios (WCAG AA minimum)
- Keyboard navigation for all interactive elements
- Focus visible states (ring-2 ring-offset-2)
- Alt text for all images/screenshots

## Animations
**Minimal, purposeful animations only:**
- Card hover elevation (transform: translateY(-4px))
- Tab indicator slide (transition-transform)
- Smooth scrolling for anchor links
- Fade-in on scroll for cards (subtle, optional via Intersection Observer)

## Special Considerations
- Link validation: Display status indicators (working/archived)
- Project grouping by turma maintains educational context
- Bilingual support ready (Portuguese primary)
- Print-friendly styles for sharing