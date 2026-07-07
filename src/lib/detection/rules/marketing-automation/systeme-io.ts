import type { TechnologyDefinition } from '../../types';

export const systemeIoTechnologyDefinition = {
	id: "systeme-io",
	name: "Systeme.io",
	website: "https://systeme.io",
	description: "Systeme.io is an all-in-one marketing platform that helps businesses create and launch sales funnels, affiliate programs, email marketing campaigns, online courses, blogs, and websites.",
	icon: "Systeme.io.svg",
	categories: [
		"marketing-automation",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "systeme-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/systeme\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "systeme-io:dom:1",
			kind: "dom",
			selector: "from[action*='//systeme.io/'], a[href*='//systeme.io/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "systeme-io:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("\\.systeme\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "systeme-io:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^systeme_affiliate$", "i"),
			description: "Cookie name matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
