import type { TechnologyDefinition } from '../../types';

export const kykloTechnologyDefinition = {
	id: "kyklo",
	name: "KYKLO",
	website: "https://www.kyklo.co",
	description: "KYKLO is a cloud-based ecommerce platform designed for the automation and electrical industry.",
	icon: "KYKLO.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kyklo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.kyklo\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kyklo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Kyklo.Branding",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
