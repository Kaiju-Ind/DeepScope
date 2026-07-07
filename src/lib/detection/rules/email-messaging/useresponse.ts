import type { TechnologyDefinition } from '../../types';

export const useresponseTechnologyDefinition = {
	id: "useresponse",
	name: "UseResponse",
	website: "https://www.useresponse.com",
	description: "UseResponse is a multi-channel customer support software suite that provides tools for managing customer inquiries, reducing response times, and supporting improved service workflows across communication channels.",
	icon: "UseResponse.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "useresponse:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.useresponse\\.com\\/"),
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
