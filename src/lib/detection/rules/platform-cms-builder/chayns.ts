import type { TechnologyDefinition } from '../../types';

export const chaynsTechnologyDefinition = {
	id: "chayns",
	name: "Chayns",
	website: "https://chayns.site",
	description: "Chayns is a web platform that enables businesses and organizations to create customizable websites and apps, providing tools for digital communication, content management, and ecommerce integration.",
	icon: "Chayns.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "chayns:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.chayns-static\\.space"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
