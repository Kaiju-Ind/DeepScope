import type { TechnologyDefinition } from '../../types';

export const beyondmenuTechnologyDefinition = {
	id: "beyondmenu",
	name: "BeyondMenu",
	website: "https://www.beyondmenu.com/contactus.aspx",
	description: "BeyondMenu is an online food ordering service.",
	icon: "BeyondMenu.png",
	categories: [
		"platform-cms-builder",
		"booking-scheduling",
	],
	rules: [
		{
			id: "beyondmenu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.beyondmenu\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
