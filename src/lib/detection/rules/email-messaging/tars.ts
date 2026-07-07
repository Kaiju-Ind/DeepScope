import type { TechnologyDefinition } from '../../types';

export const tarsTechnologyDefinition = {
	id: "tars",
	name: "Tars",
	website: "https://hellotars.com/",
	description: "Tars is a platform for creating chatbots without programming knowledge.",
	icon: "Tars.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "tars:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.hellotars\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tars:dom:1",
			kind: "dom",
			selector: "link[href*='api.hellotars.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tars:jsGlobal:2",
			kind: "jsGlobal",
			property: "tarsWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
