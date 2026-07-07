import type { TechnologyDefinition } from '../../types';

export const backerkitTechnologyDefinition = {
	id: "backerkit",
	name: "BackerKit",
	website: "https://www.backerkit.com",
	description: "BackerKit is a crowdfunding backer management and post-campaign commerce platform.",
	icon: "BackerKit.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "backerkit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.backerkit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "backerkit:jsGlobal:1",
			kind: "jsGlobal",
			property: "BackerKitPreorders",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "backerkit:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_backerkit_sessionv2$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
