import type { TechnologyDefinition } from '../../types';

export const skyglueTechnologyDefinition = {
	id: "skyglue",
	name: "SkyGlue",
	website: "https://www.skyglue.com",
	description: "SkyGlue is a tool that automatically tracks every user action on a website, providing insights into user behavior, their needs, and the reasons for drop-off.",
	icon: "SkyGlue.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "skyglue:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dc\\.skyglue\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
