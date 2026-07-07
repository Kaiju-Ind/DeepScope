import type { TechnologyDefinition } from '../../types';

export const pronoteTechnologyDefinition = {
	id: "pronote",
	name: "PRONOTE",
	website: "https://www.index-education.com/fr/logiciel-gestion-vie-scolaire.php",
	description: "PRONOTE is an information system created by Index Education, a French company, designed for deployment in approximately 7,400 schools to enable streamlined communication among administrative personnel, teachers, and families.",
	icon: "PRONOTE.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "pronote:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^PRONOTE\\s[\\d]{4}\\s-\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pronote:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^PRONOTE$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pronote:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^pronote\\s[\\d]{4}\\s-\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pronote:meta:3",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^pronote$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
