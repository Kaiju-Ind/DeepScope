import type { TechnologyDefinition } from '../../types';

export const jugemTechnologyDefinition = {
	id: "jugem",
	name: "Jugem",
	website: "https://jugem.jp",
	description: "Jugem is a blogging software from Japan that allows users to create, manage, and publish online content.",
	icon: "Jugem.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "jugem:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("imaging\\.jugem\\.jp"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
