import type { TechnologyDefinition } from '../../types';

export const cosmicTechnologyDefinition = {
	id: "cosmic",
	name: "Cosmic",
	website: "https://www.cosmicjs.com",
	description: "Cosmic is a cloud-based CMS that provides developers with an API and web interface for content management, enabling the creation of custom content types, relationship definitions, and webhooks for actions based on content changes.",
	icon: "cosmicjs.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cosmic:dom:0",
			kind: "dom",
			selector: "link[href*='.cosmicjs.com/'], img[src*='.cosmicjs.com/'], img[data-src*='.cosmicjs.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
