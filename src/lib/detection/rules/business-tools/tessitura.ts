import type { TechnologyDefinition } from '../../types';

export const tessituraTechnologyDefinition = {
	id: "tessitura",
	name: "Tessitura",
	website: "https://www.tessituranetwork.com",
	icon: "tessitura.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "tessitura:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]+Tessitura Version: (\\d*\\.\\d*\\.\\d*)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "tessitura:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^>]+tessitura version: (\\d*\\.\\d*\\.\\d*)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"iis",
		"microsoft-asp-net",
		"windows-server",
	],
} as const satisfies TechnologyDefinition;
