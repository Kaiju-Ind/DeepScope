import type { TechnologyDefinition } from '../../types';

export const sentaraTechnologyDefinition = {
	id: "sentara",
	name: "Sentara",
	website: "https://www.sentara.com",
	description: "Sentara is a nonprofit healthcare system focused on improving health through integrated care delivery.",
	icon: "Sentara.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sentara:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.sentara\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
