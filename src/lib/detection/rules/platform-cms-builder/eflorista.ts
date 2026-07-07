import type { TechnologyDefinition } from '../../types';

export const efloristaTechnologyDefinition = {
	id: "eflorista",
	name: "Eflorista",
	website: "https://www.eflorista.com.br",
	description: "Eflorista is an ecommerce and ERP platform for flower shops and businesses.",
	icon: "Eflorista.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "eflorista:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.eflorista\\.com\\.br"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
