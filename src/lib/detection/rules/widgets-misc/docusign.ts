import type { TechnologyDefinition } from '../../types';

export const docusignTechnologyDefinition = {
	id: "docusign",
	name: "DocuSign",
	website: "https://www.docusign.com",
	description: "DocuSign allows organisations to manage electronic agreements.",
	icon: "DocuSign.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "docusign:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("docusign\\.net"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "docusign:dns:1",
			kind: "dns",
			valuePattern: new RegExp("docusign", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
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
