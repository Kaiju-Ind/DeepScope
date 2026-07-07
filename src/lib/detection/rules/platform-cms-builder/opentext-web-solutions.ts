import type { TechnologyDefinition } from '../../types';

export const opentextWebSolutionsTechnologyDefinition = {
	id: "opentext-web-solutions",
	name: "OpenText Web Solutions",
	website: "https://websolutions.opentext.com",
	icon: "OpenText Web Solutions.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "opentext-web-solutions:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]+published by Open Text Web Solutions"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "opentext-web-solutions:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^>]+published by open text web solutions"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
