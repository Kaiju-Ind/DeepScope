import type { TechnologyDefinition } from '../../types';

export const kvcoreTechnologyDefinition = {
	id: "kvcore",
	name: "KVCore",
	website: "https://kvcore.com",
	description: "KVCore is an all-in-one real estate technology platform for agents, teams, and brokers, offering CRM, lead generation, marketing automation, and transaction tools in a single system.",
	icon: "KVCore.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "kvcore:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("sociallogin\\.kvcore\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
