import type { TechnologyDefinition } from '../../types';

export const novaresaTechnologyDefinition = {
	id: "novaresa",
	name: "Novaresa",
	website: "https://www.novaresa.fr",
	description: "Novaresa is a cloud-based platform designed to manage, operate, and promote hosting services through centralized tools for administration, service delivery, and customer engagement.",
	icon: "Novaresa.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "novaresa:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.novaresa\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "novaresa:jsGlobal:1",
			kind: "jsGlobal",
			property: "jquery_novaresa.Animation",
			description: "Page-owned global matches a known technology marker.",
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
