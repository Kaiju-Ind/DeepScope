# Frontend visual judgment

Use the brief, audience, existing design system, and accessibility needs to choose a coherent visual direction. This maintained reference keeps the imported typography, surface, motion, and performance techniques below; it does not prescribe a particular font, extreme style, or new dependency.

## Quick Reference

| Category | When to Use |
| --- | --- |
| [Typography](typography.md) | Text wrapping, font smoothing, tabular numbers |
| [Surfaces](surfaces.md) | Border radius, optical alignment, shadows, image outlines, hit areas |
| [Animations](animations.md) | Interruptible animations, enter/exit transitions, icon animations, scale on press |
| [Performance](performance.md) | Transition specificity, `will-change` usage |
| [Audit Motion Performance](audit-motion-performance.md) | Review and optimize motion performance in the UI |
| [Make Interfaces Feel Better](make-interfaces-feel-better.md) | Enhance the perceived responsiveness and interactivity of the UI |

## Choose a direction that serves the task

Identify the user's task, information density, important states, viewport/input constraints, and desired tone before changing the design. Carry one deliberate direction through typography, color, layout, surfaces, and motion. A familiar restrained dashboard can be as intentional as an expressive editorial page; novelty is useful only when it supports comprehension or the brief.

- **Typography:** choose readable type and a clear size/weight/leading hierarchy. Existing system fonts, Inter, Arial, or a distinctive display face can each fit a context. Check numeric alignment, wrapping, zoom, and language coverage before adding a font.
- **Color:** use a consistent token palette with meaningful accents and adequate contrast in all required themes. A gradient or solid background earns its place through the hierarchy it creates.
- **Motion:** explain spatial relationships or provide timely state feedback. Prefer the existing rendering stack, keep frequent tasks immediate, and provide reduced-motion behavior. Decorative reveals and hover effects are optional.
- **Composition:** use alignment, spacing, and density to make the user's next step obvious. Asymmetry, overlap, or generous space can express a direction; they must survive responsive layouts and long content.
- **Surfaces and details:** choose borders, shadows, texture, or translucency for separation and legibility. Optical alignment, clear hit areas, and consistent radii matter more than piling on effects.

Match implementation cost to the visible benefit. Check the actual component under realistic content, loading, errors, keyboard input, touch, and zoom. Preserve the existing product conventions unless the scoped brief calls for a change. Numeric recipes in the linked references are starting points; browser, framework, and device claims require verification in the target runtime.
