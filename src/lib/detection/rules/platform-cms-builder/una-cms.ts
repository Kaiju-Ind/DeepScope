import type { TechnologyDefinition } from '../../types';

export const unaCmsTechnologyDefinition = {
	id: "una-cms",
	name: "UNA CMS",
	website: "https://unacms.com",
	description: "UNA CMS is an open-source platform designed for building social networking sites and online communities with a modular architecture, responsive design, and robust privacy features.",
	icon: "Una CMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "una-cms:jsGlobal:0",
			kind: "jsGlobal",
			property: "BxArtificerMenuMoreAuto",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "una-cms:jsGlobal:1",
			kind: "jsGlobal",
			property: "bx_autocomplete_fields",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "una-cms:jsGlobal:2",
			kind: "jsGlobal",
			property: "bx_redirect_for_external_links",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "una-cms:jsGlobal:3",
			kind: "jsGlobal",
			property: "bx_search_extnded_sort",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "una-cms:jsGlobal:4",
			kind: "jsGlobal",
			property: "bx_site_search_complet",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
