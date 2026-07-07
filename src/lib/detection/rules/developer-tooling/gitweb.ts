import type { TechnologyDefinition } from '../../types';

export const gitwebTechnologyDefinition = {
	id: "gitweb",
	name: "gitweb",
	website: "https://git-scm.com",
	icon: "git.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "gitweb:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\/gitweb\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gitweb:html:1",
			kind: "html",
			pattern: new RegExp("<!-- git web interface version ([\\d.]+)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gitweb:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("gitweb(?:\\/([\\d.]+\\d))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"git",
		"perl",
	],
} as const satisfies TechnologyDefinition;
