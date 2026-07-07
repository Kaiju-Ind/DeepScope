import type { TechnologyDefinition } from '../../types';

export const hushlyTechnologyDefinition = {
	id: "hushly",
	name: "Hushly",
	website: "https://www.hushly.com",
	description: "Hushly is an all-in-one B2B marketing software platform.",
	icon: "Hushly.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "hushly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hushly\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hushly:dom:1",
			kind: "dom",
			selector: "link[href*='.hushly.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hushly:jsGlobal:2",
			kind: "jsGlobal",
			property: "__hly_widget_object",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
