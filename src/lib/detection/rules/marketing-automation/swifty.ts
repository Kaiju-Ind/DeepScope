import type { TechnologyDefinition } from '../../types';

export const swiftyTechnologyDefinition = {
	id: "swifty",
	name: "Swifty",
	website: "https://beswifty.com",
	description: "Swifty is a platform for managing marketing campaigns designed to convert leads into leases.",
	icon: "Swifty.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "swifty:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.beswifty\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "swifty:jsGlobal:1",
			kind: "jsGlobal",
			property: "swifty_blog_loadmore_params",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
