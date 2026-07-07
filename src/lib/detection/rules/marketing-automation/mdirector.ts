import type { TechnologyDefinition } from '../../types';

export const mdirectorTechnologyDefinition = {
	id: "mdirector",
	name: "MDirector",
	website: "https://www.mdirector.com",
	description: "MDirector is an all-in-one digital marketing platform that centralizes email, SMS, and automation tools to manage campaigns and analyze audience engagement.",
	icon: "MDirector.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mdirector:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/mdirector-newsletter\\/public\\/js\\/mdirector-newsletter-public\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mdirector:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.mdirector\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
