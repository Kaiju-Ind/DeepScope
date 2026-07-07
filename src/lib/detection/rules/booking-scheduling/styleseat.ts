import type { TechnologyDefinition } from '../../types';

export const styleseatTechnologyDefinition = {
	id: "styleseat",
	name: "StyleSeat",
	website: "https://www.styleseat.com",
	description: "StyleSeat is a web-based appointment scheduling platform that enables users to book and manage beauty and personal care services online through a centralized system.",
	icon: "StyleSeat.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "styleseat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.styleseat\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
