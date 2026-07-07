import type { TechnologyDefinition } from '../../types';

export const kiprotectTechnologyDefinition = {
	id: "kiprotect",
	name: "Kiprotect",
	website: "https://kiprotect.com",
	description: "Kiprotect is a software platform that provides data protection and data security capabilities for safeguarding digital information.",
	icon: "Kiprotect.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "kiprotect:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.kiprotect\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
