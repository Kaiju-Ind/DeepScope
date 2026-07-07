import type { TechnologyDefinition } from '../../types';

export const pitcheroTechnologyDefinition = {
	id: "pitchero",
	name: "Pitchero",
	website: "https://www.pitchero.com",
	description: "Pitchero is a sports website creation software that enables teams, clubs, and leagues to build and manage websites with tools for scheduling, communication, and content publishing.",
	icon: "Pitchero.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pitchero:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.pitchero\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
