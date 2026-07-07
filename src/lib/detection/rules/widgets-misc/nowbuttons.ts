import type { TechnologyDefinition } from '../../types';

export const nowbuttonsTechnologyDefinition = {
	id: "nowbuttons",
	name: "NowButtons",
	website: "https://nowbuttons.com",
	description: "NowButtons is a floating action button plugin that enhances website interactivity by providing quick access to key actions and improving user conversion rates.",
	icon: "NowButtons.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "nowbuttons:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.callnowbutton\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nowbuttons:dom:1",
			kind: "dom",
			selector: "link[href*='static.callnowbutton.com/']",
			description: "DOM selector matches a known technology marker.",
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
