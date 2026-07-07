import type { TechnologyDefinition } from '../../types';

export const paraglideJsTechnologyDefinition = {
	id: "paraglide-js",
	name: "Paraglide JS",
	website: "https://inlang.com/m/gerre34r/library-inlang-paraglideJs",
	description: "Paraglide JS is a compiler-based i18n library that emits tree-shakable message functions for optimized localization workflows.",
	icon: "ParaglideJS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "paraglide-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "__paraglide",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
