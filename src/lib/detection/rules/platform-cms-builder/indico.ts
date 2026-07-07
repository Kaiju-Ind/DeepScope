import type { TechnologyDefinition } from '../../types';

export const indicoTechnologyDefinition = {
	id: "indico",
	name: "Indico",
	website: "https://getindico.io",
	description: "Indico is an open-source event management system designed for organizing scientific conferences and workshops.",
	icon: "Indico.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "indico:html:0",
			kind: "html",
			pattern: new RegExp("Powered by\\s+(?:CERN )?<a href=\"http:\\/\\/(?:cdsware\\.cern\\.ch\\/indico\\/|indico-software\\.org|cern\\.ch\\/indico)\">(?:CDS )?Indico( [\\d\\.]+)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "indico:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^MAKACSESSION$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "indico:html:2",
			kind: "html",
			pattern: new RegExp("powered by\\s+(?:cern )?<a href=\"http:\\/\\/(?:cdsware\\.cern\\.ch\\/indico\\/|indico-software\\.org|cern\\.ch\\/indico)\">(?:cds )?indico( [\\d\\.]+)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "indico:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^makacsession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
