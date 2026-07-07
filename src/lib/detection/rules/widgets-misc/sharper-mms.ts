import type { TechnologyDefinition } from '../../types';

export const sharperMmsTechnologyDefinition = {
	id: "sharper-mms",
	name: "Sharper MMS",
	website: "https://sharpermms.com",
	description: "Sharper MMS is a provider of marina management services, focusing on operations and maintenance for marina facilities.",
	icon: "SharperMMS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sharper-mms:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.sharpermms\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
