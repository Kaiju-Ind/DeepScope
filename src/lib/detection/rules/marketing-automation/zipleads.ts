import type { TechnologyDefinition } from '../../types';

export const zipleadsTechnologyDefinition = {
	id: "zipleads",
	name: "Zipleads",
	website: "https://zipleads.com.au",
	description: "Zipleads is a lead conversion platform that helps businesses capture, manage, and convert potential customers through automated lead tracking and engagement tools.",
	icon: "Zipleads.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "zipleads:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.zipleads\\.com\\.au"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "zipleads:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^ZipLeads$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zipleads:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^zipleads$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
