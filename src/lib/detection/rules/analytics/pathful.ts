import type { TechnologyDefinition } from '../../types';

export const pathfulTechnologyDefinition = {
	id: "pathful",
	name: "Pathful",
	website: "https://pathful.com",
	description: "Pathify is a data-driven conversion optimization platform designed to improve website performance through analytics and user behavior insights.",
	icon: "Pathful.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "pathful:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("ssl\\.pathful\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
