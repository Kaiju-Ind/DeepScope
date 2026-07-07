import type { TechnologyDefinition } from '../../types';

export const etrigueTechnologyDefinition = {
	id: "etrigue",
	name: "eTrigue",
	website: "https://www.etrigue.com",
	description: "eTrigue is a demand generation and sales acceleration software that helps businesses identify, engage, and convert prospects through automated marketing and lead nurturing.",
	icon: "eTrigue.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "etrigue:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("trk\\.etrigue\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
