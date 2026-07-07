import type { TechnologyDefinition } from '../../types';

export const xamppTechnologyDefinition = {
	id: "xampp",
	name: "XAMPP",
	website: "https://www.apachefriends.org/en/xampp.html",
	icon: "XAMPP.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "xampp:html:0",
			kind: "html",
			pattern: new RegExp("<title>XAMPP(?: Version ([\\d\\.]+))?<\\/title>"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xampp:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Kai Oswald Seidler", "i"),
			confidence: 10,
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "xampp:html:2",
			kind: "html",
			pattern: new RegExp("<title>xampp(?: version ([\\d\\.]+))?<\\/title>"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xampp:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("kai oswald seidler", "i"),
			confidence: 10,
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"apache-http-server",
		"mysql",
		"perl",
		"php",
	],
} as const satisfies TechnologyDefinition;
