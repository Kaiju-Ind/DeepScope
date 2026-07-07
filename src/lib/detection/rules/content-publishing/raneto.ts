import type { TechnologyDefinition } from '../../types';

export const ranetoTechnologyDefinition = {
	id: "raneto",
	name: "Raneto",
	website: "https://raneto.com",
	description: "Raneto is a Markdown-powered open-source Knowledgebase for Node.js that uses static files to manage and serve structured documentation.",
	icon: "Raneto.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "raneto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/scripts\\/raneto\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
