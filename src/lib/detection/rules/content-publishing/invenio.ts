import type { TechnologyDefinition } from '../../types';

export const invenioTechnologyDefinition = {
	id: "invenio",
	name: "Invenio",
	website: "https://invenio-software.org",
	description: "Invenio is an open-source software framework for large-scale digital repositories that provides the tools for management of digital assets in an institutional repository and research data management systems.",
	icon: "Invenio.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "invenio:html:0",
			kind: "html",
			pattern: new RegExp("(?:Powered by|System)\\s+(?:CERN )?<a (?:class=\"footer\" )?href=\"http:\\/\\/(?:cdsware\\.cern\\.ch(?:\\/invenio)?|invenio-software\\.org|cern\\.ch\\/invenio)(?:\\/)?\">(?:CDS )?Invenio<\\/a>\\s*v?([\\d\\.]+)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "invenio:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^INVENIOSESSION$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "invenio:html:2",
			kind: "html",
			pattern: new RegExp("(?:powered by|system)\\s+(?:cern )?<a (?:class=\"footer\" )?href=\"http:\\/\\/(?:cdsware\\.cern\\.ch(?:\\/invenio)?|invenio-software\\.org|cern\\.ch\\/invenio)(?:\\/)?\">(?:cds )?invenio<\\/a>\\s*v?([\\d\\.]+)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "invenio:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^inveniosession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
