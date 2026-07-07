import type { TechnologyDefinition } from '../../types';

export const snappsTechnologyDefinition = {
	id: "snapps",
	name: "Snapps",
	website: "https://www.snapps.ai",
	description: "Snapps is a platform designed to host and build websites.",
	icon: "Snapps.svg",
	categories: [
		"platform-cms-builder",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "snapps:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/\\/snappsapi\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
