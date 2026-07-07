import type { TechnologyDefinition } from '../../types';

export const silktideTechnologyDefinition = {
	id: "silktide",
	name: "Silktide",
	website: "https://silktide.com",
	description: "Silktide is a platform that automatically detects and resolves accessibility, content, and user experience issues on websites.",
	icon: "Silktide.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "silktide:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.silktide\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "silktide:jsGlobal:1",
			kind: "jsGlobal",
			property: "silktide",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "silktide:jsGlobal:2",
			kind: "jsGlobal",
			property: "silktideInstance",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
