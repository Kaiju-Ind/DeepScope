import type { TechnologyDefinition } from '../../types';

export const mantisbtTechnologyDefinition = {
	id: "mantisbt",
	name: "MantisBT",
	website: "https://www.mantisbt.org",
	description: "MantisBT is an open-source, web-based issue tracking system written in PHP with a MySQL database backend, designed to facilitate bug tracking and project management for software development teams.",
	icon: "MantisBT.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "mantisbt:html:0",
			kind: "html",
			pattern: new RegExp("<img[^>]+ alt=\"Powered by Mantis Bugtracker"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mantisbt:dom:1",
			kind: "dom",
			selector: "link[rel='stylesheet'][href*='/css/ace-mantis.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:mantisbt:mantisbt:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
	requires: [
		"php",
	],
} as const satisfies TechnologyDefinition;
