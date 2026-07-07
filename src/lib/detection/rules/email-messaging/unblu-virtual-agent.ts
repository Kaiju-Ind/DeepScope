import type { TechnologyDefinition } from '../../types';

export const unbluVirtualAgentTechnologyDefinition = {
	id: "unblu-virtual-agent",
	name: "Unblu Virtual Agent",
	website: "https://www.unblu.com",
	description: "Unblu Virtual Agent is a platform that provides customers with 24/7 access to intelligent, automated conversations designed to feel human.",
	icon: "Unblu.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "unblu-virtual-agent:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.unblu\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
