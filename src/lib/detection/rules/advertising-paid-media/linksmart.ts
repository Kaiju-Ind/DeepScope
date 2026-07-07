import type { TechnologyDefinition } from '../../types';

export const linksmartTechnologyDefinition = {
	id: "linksmart",
	name: "LinkSmart",
	website: "http://linksmart.com",
	icon: "LinkSmart.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "linksmart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/cdn\\.linksmart\\.com\\/linksmart_([\\d.]+?)(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "linksmart:jsGlobal:1",
			kind: "jsGlobal",
			property: "LS_JSON",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linksmart:jsGlobal:2",
			kind: "jsGlobal",
			property: "LinkSmart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linksmart:jsGlobal:3",
			kind: "jsGlobal",
			property: "_mb_site_guid",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
