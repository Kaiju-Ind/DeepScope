import type { TechnologyDefinition } from '../../types';

export const lazysizesTechnologyDefinition = {
	id: "lazysizes",
	name: "LazySizes",
	website: "https://github.com/aFarkas/lazysizes",
	description: "LazySizes is a JavaScript library used to delay the loading of images (iframes, scripts, etc) until they come into view.",
	icon: "default.svg",
	categories: [
		"widgets-misc",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "lazysizes:jsGlobal:0",
			kind: "jsGlobal",
			property: "lazySizes",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lazysizes:jsGlobal:1",
			kind: "jsGlobal",
			property: "lazySizesConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:lazysizes_project:lazysizes:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
