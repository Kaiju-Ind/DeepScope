import type { TechnologyDefinition } from '../../types';

export const eurowebTechnologyDefinition = {
	id: "euroweb",
	name: "Euroweb",
	website: "https://www.euroweb.de",
	description: "Euroweb is a website builder that provides tools for creating, managing, and publishing websites for businesses and individuals.",
	icon: "Euroweb.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "euroweb:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.euroweb\\.de"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
