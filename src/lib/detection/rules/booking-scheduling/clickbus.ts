import type { TechnologyDefinition } from '../../types';

export const clickbusTechnologyDefinition = {
	id: "clickbus",
	name: "ClickBus",
	website: "https://www.clickbus.com.br",
	description: "ClickBus is an online platform that enables users to search, compare, and book bus travel routes.",
	icon: "ClickBus.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "clickbus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.clickbus\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
