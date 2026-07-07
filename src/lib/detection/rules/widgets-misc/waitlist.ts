import type { TechnologyDefinition } from '../../types';

export const waitlistTechnologyDefinition = {
	id: "waitlist",
	name: "Waitlist",
	website: "https://www.getwaitlist.com",
	description: "Waitlist is a web-based tool that helps businesses to create a waitlist for their product or service.",
	icon: "Waitlist.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "waitlist:jsGlobal:0",
			kind: "jsGlobal",
			property: "gw_backend_url",
			valuePattern: new RegExp("\\/\\/api\\.getwaitlist\\.com\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "waitlist:jsGlobal:1",
			kind: "jsGlobal",
			property: "gw_waitlist_name",
			description: "Page-owned global matches a known technology marker.",
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
