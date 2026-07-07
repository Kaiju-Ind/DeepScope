import type { TechnologyDefinition } from '../../types';

export const aasaanTechnologyDefinition = {
	id: "aasaan",
	name: "Aasaan",
	website: "https://aasaan.app",
	description: "Aasaan is a no-code e-commerce platform that helps digitalize businesses to grow.",
	icon: "Aasaan.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aasaan:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.aasaan\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
