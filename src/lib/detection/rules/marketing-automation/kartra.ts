import type { TechnologyDefinition } from '../../types';

export const kartraTechnologyDefinition = {
	id: "kartra",
	name: "Kartra",
	website: "https://home.kartra.com",
	description: "Kartra is an online business platform that offers marketing and sales tools.",
	icon: "Kartra.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kartra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.kartra\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kartra:dom:1",
			kind: "dom",
			selector: "form[action*='app.kartra.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kartra:jsGlobal:2",
			kind: "jsGlobal",
			property: "init_kartra_tracking",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kartra:jsGlobal:3",
			kind: "jsGlobal",
			property: "kartra_tracking_loaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
