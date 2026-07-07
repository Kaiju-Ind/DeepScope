import type { TechnologyDefinition } from '../../types';

export const conexaTechnologyDefinition = {
	id: "conexa",
	name: "Conexa",
	website: "https://conexa.ai",
	description: "Conexa is a business scaling technology partner platform designed to support growth through strategic solutions and automation.",
	icon: "Conexa.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "conexa:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.conexa\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
