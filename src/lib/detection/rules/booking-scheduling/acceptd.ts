import type { TechnologyDefinition } from '../../types';

export const acceptdTechnologyDefinition = {
	id: "acceptd",
	name: "Acceptd",
	website: "https://getacceptd.com",
	description: "Acceptd is a premier application and audition management platform designed to streamline the submission, review, and selection process for organizations and educational institutions.",
	icon: "Acceptd.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "acceptd:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.getacceptd\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "acceptd:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Acceptd Application$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "acceptd:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^acceptd application$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
