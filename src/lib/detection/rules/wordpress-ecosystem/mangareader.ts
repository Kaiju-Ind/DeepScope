import type { TechnologyDefinition } from '../../types';

export const mangareaderTechnologyDefinition = {
	id: "mangareader",
	name: "MangaReader",
	website: "https://themesia.com/mangareader-wordpress-theme",
	description: "MangaReader is a WordPress theme designed for creating websites, offering customizable layouts and responsive design.",
	icon: "MangaReader.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "mangareader:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("mangareader\\.themesia"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
