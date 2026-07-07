import type { TechnologyDefinition } from '../../types';

export const boarddocsTechnologyDefinition = {
	id: "boarddocs",
	name: "BoardDocs",
	website: "https://www.diligent.com/lp/boarddocs",
	description: "BoardDocs is a school board management software that supports the creation, distribution, and archival of meeting agendas, documents, and records for governing bodies.",
	icon: "Diligent.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "boarddocs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.boarddocs\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
