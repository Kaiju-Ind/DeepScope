import type { TechnologyDefinition } from '../../types';

export const getyourguideTechnologyDefinition = {
	id: "getyourguide",
	name: "GetYourGuide",
	website: "https://partner.getyourguide.com",
	description: "GetYourGuide is a Berlin-based online travel agency and online marketplace for tour guides and excursions.",
	icon: "GetYourGuide.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "getyourguide:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getyourguide\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "getyourguide:dom:1",
			kind: "dom",
			selector: "a[href*='.getyourguide.']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "getyourguide:dom:2",
			kind: "dom",
			selector: "img[src*='cdn.getyourguide.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "getyourguide:dom:3",
			kind: "dom",
			selector: "link[href*='cdn.getyourguide.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
