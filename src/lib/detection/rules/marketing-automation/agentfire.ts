import type { TechnologyDefinition } from '../../types';

export const agentfireTechnologyDefinition = {
	id: "agentfire",
	name: "AgentFire",
	website: "https://agentfire.com",
	description: "AgentFire is a platform designed for the real estate industry, offering tools and features that help agents capitalize on digital opportunities for marketing, lead generation, and client engagement.",
	icon: "AgentFire.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "agentfire:jsGlobal:0",
			kind: "jsGlobal",
			property: "AgentFire.Api",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "agentfire:jsGlobal:1",
			kind: "jsGlobal",
			property: "AgentFire_Oauth2",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "agentfire:jsGlobal:2",
			kind: "jsGlobal",
			property: "AgentFire_Settings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
