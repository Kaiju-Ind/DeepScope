# Performance

Transition specificity and GPU compositing hints.

## Transition Only What Changes

Specify the properties that actually change rather than using `transition: all`. For a Tailwind utility, inspect the installed version's generated CSS; `transition` is not necessarily equivalent to `transition-all`.

### Why

- `transition: all` forces the browser to watch every property for changes
- Causes unexpected transitions on properties you didn't intend to animate (colors, padding, shadows)
- Prevents browser optimizations

### CSS Example

```css
/* Good — only transition what changes */
.button {
  transition-property: scale, background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}

/* Bad — transition everything */
.button {
  transition: all 150ms ease-out;
}
```

### Tailwind

```tsx
// Good — explicit properties
<button className="transition-[scale,background-color] duration-150 ease-out">

// Broad utility — inspect generated properties before choosing
<button className="transition duration-150 ease-out">
```

### Tailwind `transition-transform` Note

`transition-transform` in Tailwind maps to `transition-property: transform, translate, scale, rotate` — it covers all transform-related properties, not just `transform`. Use this when you're only animating transforms. For multiple non-transform properties, use the bracket syntax: `transition-[scale,opacity,filter]`.

## Use `will-change` Sparingly

`will-change` hints that a property will change. It can help the browser prepare a layer, but neither promotion nor a speedup is guaranteed. Profile first-frame work before using it, and remove temporary hints after motion.

This particularly helps when an element is changing `scale`, `rotation`, or moving around with `transform`. For other properties, it doesn't help much — the browser can't composite them on the GPU anyway.

### Rules

```css
/* Good — specific property that benefits from GPU compositing */
.animated-card {
  will-change: transform;
}

/* Good — multiple compositor-friendly properties */
.animated-card {
  will-change: transform, opacity;
}

/* Bad — never use will-change: all */
.animated-card {
  will-change: all;
}

/* Bad — properties that can't be GPU-composited anyway */
.animated-card {
  will-change: background-color, padding;
}
```

### Useful Properties

| Property | Typical rendering consideration | Hint worth testing |
| --- | --- | --- |
| `transform` | Compositor candidate | After profiling |
| `opacity` | Compositor candidate | After profiling |
| `filter` (blur, brightness) | Can need expensive raster/paint work | Only with evidence |
| `clip-path` | Shape/browser dependent | Only with evidence |
| `top`, `left`, `width`, `height` | No | No |
| `background`, `border`, `color` | No | No |

### When to Skip

Modern browsers are already good at optimizing on their own. Only add `will-change` when you notice first-frame stutter — Safari in particular benefits from it. Don't add it preemptively to every animated element; each extra compositing layer costs memory.
