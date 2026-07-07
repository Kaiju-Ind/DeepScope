import type { TechnologyDefinition } from '../../types';

export const vclassesTechnologyDefinition = {
	id: "vclasses",
	name: "VClasses",
	website: "https://vclasses.net",
	description: "VClasses is a subscription-based software platform that enables users to set up a secure learning management system (LMS) and offer courses for sale.",
	icon: "VClasses.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "vclasses:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.vclasses\\.net"),
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
