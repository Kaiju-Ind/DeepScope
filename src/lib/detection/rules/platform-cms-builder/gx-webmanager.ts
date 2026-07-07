import type { TechnologyDefinition } from '../../types';

export const gxWebmanagerTechnologyDefinition = {
	id: "gx-webmanager",
	name: "GX WebManager",
	website: "https://www.gxsoftware.com/en/products/web-content-management.htm",
	icon: "GX WebManager.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gx-webmanager:html:0",
			kind: "html",
			pattern: new RegExp("<!--\\s+Powered by GX"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gx-webmanager:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("GX WebManager(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "gx-webmanager:html:2",
			kind: "html",
			pattern: new RegExp("<!--\\s+powered by gx"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gx-webmanager:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("gx webmanager(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
