import type { TechnologyDefinition } from '../../types';

export const opignoLmsTechnologyDefinition = {
	id: "opigno-lms",
	name: "Opigno LMS",
	website: "https://www.opigno.org",
	description: "Opigno LMS is an open-source Learning Management System (LMS) based on Drupal, designed for creating and delivering online courses and educational content.",
	icon: "Opigno LMS.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "opigno-lms:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("opigno_(?:commerce|wtp_app|scorm|learning_path)"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"drupal",
	],
} as const satisfies TechnologyDefinition;
