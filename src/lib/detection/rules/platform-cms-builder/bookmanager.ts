import type { TechnologyDefinition } from '../../types';

export const bookmanagerTechnologyDefinition = {
	id: "bookmanager",
	name: "BookManager",
	website: "https://bookmanager.com",
	description: "BookManager is a software solution for booksellers and vendors.",
	icon: "BookManager.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bookmanager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bookmanager\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bookmanager:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackJsonpbookmanager",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
