import type { TechnologyDefinition } from '../../types';

export const aniviewAdServerTechnologyDefinition = {
	id: "aniview-ad-server",
	name: "Aniview Ad Server",
	website: "https://aniview.com/video-ad-servers/",
	description: "Aniview Ad Server is a technology developed by Aniview, a company that specialises in providing video advertising solutions. The Aniview Ad Server is a platform designed to manage and serve video ads to publishers, advertisers, and agencies.",
	icon: "Aniview.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "aniview-ad-server:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^(?!.*player).*aniview\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aniview-ad-server:dom:1",
			kind: "dom",
			selector: "link[href*='aniview.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
