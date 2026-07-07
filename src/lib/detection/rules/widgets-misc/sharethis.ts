import type { TechnologyDefinition } from '../../types';

export const sharethisTechnologyDefinition = {
	id: "sharethis",
	name: "ShareThis",
	website: "https://sharethis.com",
	description: "ShareThis provides free engagement and growth tools (e.g., share buttons, follow buttons, and reaction buttons) for site owners.",
	icon: "ShareThis.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sharethis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sharethis\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sharethis:jsGlobal:1",
			kind: "jsGlobal",
			property: "SHARETHIS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sharethis:jsGlobal:2",
			kind: "jsGlobal",
			property: "__sharethis__docReady",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:sharethis:sharethis:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
