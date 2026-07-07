import type { TechnologyDefinition } from '../../types';

export const prefersReducedMotionTechnologyDefinition = {
	id: "prefers-reduced-motion",
	name: "Reduced Motion Support",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion",
	description: "Uses prefers-reduced-motion media queries to support users who request reduced animation.",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "prefers-reduced-motion:html:0",
			kind: "html",
			pattern: new RegExp("@media\\s*\\([^)]*prefers-reduced-motion\\s*:\\s*(?:reduce|no-preference)", "i"),
			confidence: 95,
			description: "Inline CSS uses a prefers-reduced-motion media query.",
		},
		{
			id: "prefers-reduced-motion:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("@media\\s*\\([^)]*prefers-reduced-motion\\s*:\\s*(?:reduce|no-preference)", "i"),
			confidence: 100,
			description: "Stylesheet CSS uses a prefers-reduced-motion media query.",
		},
	],
} as const satisfies TechnologyDefinition;
