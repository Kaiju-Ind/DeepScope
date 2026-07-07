import type { TechnologyDefinition } from '../../types';

export const plotchTechnologyDefinition = {
	id: "plotch",
	name: "Plotch",
	website: "https://www.plotch.ai",
	description: "Plotch is an ecommerce system enabled by ONDC and Web3 technologies, designed to support decentralized and open digital commerce networks.",
	icon: "Plotch.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "plotch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdnassets\\.plotch\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
