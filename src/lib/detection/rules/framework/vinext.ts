import type { TechnologyDefinition } from '../../types';

export const vinextTechnologyDefinition = {
	id: "vinext",
	name: "Vinext",
	website: "https://github.com/cloudflare/vinext",
	description: "Vinext is a Vite plugin that reimplements the Next.js API surface, enabling Next.js-compatible development and deployment across a range of hosting environments.",
	icon: "Vinext.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "vinext:jsGlobal:0",
			kind: "jsGlobal",
			property: "__VINEXT_RSC_CHUNKS__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vinext:jsGlobal:1",
			kind: "jsGlobal",
			property: "__VINEXT_RSC_DONE__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
