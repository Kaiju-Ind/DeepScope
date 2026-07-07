import type { TechnologyDefinition } from '../../types';

export const veloceTechnologyDefinition = {
	id: "veloce",
	name: "Veloce",
	website: "https://www.velocesolutions.net",
	description: "Veloce is a provider of CRM, marketing, and website services designed for healthcare practices to improve patient engagement and operational efficiency.",
	icon: "Veloce.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "veloce:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("VeloceSolutions\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "veloce:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("velocesolutions\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
