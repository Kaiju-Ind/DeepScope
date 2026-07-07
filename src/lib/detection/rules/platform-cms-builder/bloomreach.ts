import type { TechnologyDefinition } from '../../types';

export const bloomreachTechnologyDefinition = {
	id: "bloomreach",
	name: "Bloomreach",
	website: "https://developers.bloomreach.com",
	description: "Bloomreach is a digital experience platform for ecommerce search, merchandising, content, and personalization.",
	icon: "Bloomreach.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bloomreach:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+\\/binaries\\/(?:[^/]+\\/)*content\\/gallery\\/"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
