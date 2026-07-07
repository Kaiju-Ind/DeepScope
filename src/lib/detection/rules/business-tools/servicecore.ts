import type { TechnologyDefinition } from '../../types';

export const servicecoreTechnologyDefinition = {
	id: "servicecore",
	name: "ServiceCore",
	website: "https://servicecore.com",
	description: "ServiceCore is a software solution for portable toilet, septic, and dumpster businesses that manages jobs, optimizes routes, tracks inventory, and automates billing to improve operational efficiency.",
	icon: "ServiceCore.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "servicecore:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.servicecorecms\\.wpengine\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
