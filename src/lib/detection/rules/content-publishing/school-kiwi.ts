import type { TechnologyDefinition } from '../../types';

export const schoolKiwiTechnologyDefinition = {
	id: "school-kiwi",
	name: "School Kiwi",
	website: "https://kamar.nz/support/hosted",
	description: "School Kiwi is a student management system designed to streamline administrative tasks, track student records, and enhance communication within educational institutions.",
	icon: "SchoolKiwi.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "school-kiwi:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.school\\.kiwi"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
