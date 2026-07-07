import type { TechnologyDefinition } from '../../types';

export const evernoteTechnologyDefinition = {
	id: "evernote",
	name: "Evernote",
	website: "https://evernote.com",
	description: "Evernote is a digital workspace that organizes notes, tasks, and schedules in one place for project management and information retention.",
	icon: "Evernote.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "evernote:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.evernote\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "evernote:jsGlobal:1",
			kind: "jsGlobal",
			property: "Evernote.Ajax",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:evernote:evernote:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
