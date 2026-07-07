import type { TechnologyDefinition } from '../../types';

export const mgpanelTechnologyDefinition = {
	id: "mgpanel",
	name: "MGPanel",
	website: "https://mgpanel.org",
	description: "MGPanel has it all, a content management system that gives programmers the freedom to create professional web pages from scratch, also providing their clients with a self-managing platform.",
	icon: "MGPanel.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mgpanel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mgpanel\\.org\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"mysql",
	],
	requires: [
		"php",
	],
} as const satisfies TechnologyDefinition;
