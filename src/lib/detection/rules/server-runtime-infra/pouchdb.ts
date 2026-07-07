import type { TechnologyDefinition } from '../../types';

export const pouchdbTechnologyDefinition = {
	id: "pouchdb",
	name: "PouchDB",
	website: "https://pouchdb.com",
	description: "PouchDB is an open-source NoSQL database written in JavaScript.",
	icon: "PouchDB.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "pouchdb:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/pouchdb\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pouchdb:jsGlobal:1",
			kind: "jsGlobal",
			property: "PouchDB.adapter",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
