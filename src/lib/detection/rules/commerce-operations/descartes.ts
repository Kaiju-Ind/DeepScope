import type { TechnologyDefinition } from '../../types';

export const descartesTechnologyDefinition = {
	id: "descartes",
	name: "Descartes",
	website: "https://www.descartes.com",
	description: "Descartes is a technology platform that offers solutions for logistics and supply chain management.",
	icon: "Descartes.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "descartes:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.descartes\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "descartes:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("ies\\.descartes"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
