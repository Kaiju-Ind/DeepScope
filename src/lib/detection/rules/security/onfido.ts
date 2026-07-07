import type { TechnologyDefinition } from '../../types';

export const onfidoTechnologyDefinition = {
	id: "onfido",
	name: "Onfido",
	website: "https://onfido.com",
	description: "Onfido is a technology company that helps businesses verify people's identities using a photo-based identity document, a selfie and artificial intelligence algorithms.",
	icon: "Onfido.svg",
	categories: [
		"security",
		"authentication-identity",
	],
	rules: [
		{
			id: "onfido:dom:0",
			kind: "dom",
			selector: "link[href*='.onfido.com'], iframe[src*='onfido.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "onfido:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("(?:api|sync)\\.onfido\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
