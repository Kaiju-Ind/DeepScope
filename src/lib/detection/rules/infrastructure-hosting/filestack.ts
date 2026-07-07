import type { TechnologyDefinition } from '../../types';

export const filestackTechnologyDefinition = {
	id: "filestack",
	name: "Filestack",
	website: "https://www.filestack.com",
	description: "Filestack is a file upload API and content delivery network (CDN) that enables applications to handle, store, and distribute files.",
	icon: "Filestack.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "filestack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.filestackapi\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "filestack:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.filestackapi\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
