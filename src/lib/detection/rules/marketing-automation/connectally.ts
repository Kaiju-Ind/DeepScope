import type { TechnologyDefinition } from '../../types';

export const connectallyTechnologyDefinition = {
	id: "connectally",
	name: "Connectally",
	website: "https://connectally.com",
	description: "Connectally is a lead generation and automation platform designed to help marketing professionals streamline client acquisition.",
	icon: "Connectally.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "connectally:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.connectally\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
