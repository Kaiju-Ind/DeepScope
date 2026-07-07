import type { TechnologyDefinition } from '../../types';

export const coolPopupTechnologyDefinition = {
	id: "cool-popup",
	name: "Cool Popup",
	website: "https://www.coolpopup.com",
	description: "Cool Popup is a tool that helps convert website visitors into customers, subscribers, or leads by displaying visually designed popups that require no coding to set up.",
	icon: "CoolPopup.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "cool-popup:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dash\\.coolpopup\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
