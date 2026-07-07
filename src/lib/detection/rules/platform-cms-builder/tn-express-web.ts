import type { TechnologyDefinition } from '../../types';

export const tnExpressWebTechnologyDefinition = {
	id: "tn-express-web",
	name: "TN Express Web",
	website: "https://www.tessituranetwork.com",
	description: "Tessitura is an enterprise application to manage activities in ticketing, fundraising, customer relationship management, and marketing.",
	icon: "tessitura.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tn-express-web:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^TNEW$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "tn-express-web:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^tnew$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	implies: [
		"tessitura",
	],
} as const satisfies TechnologyDefinition;
