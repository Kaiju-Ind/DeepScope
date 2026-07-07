import type { TechnologyDefinition } from '../../types';

export const buttermoveTechnologyDefinition = {
	id: "buttermove",
	name: "ButterMove",
	website: "https://www.buttermove.com",
	description: "ButterMove is a platform designed to streamline the process of moving homes by offering users a simplified approach to manage tasks, schedule services, and coordinate logistics.",
	icon: "ButterMove.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "buttermove:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.buttermove\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
