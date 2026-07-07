import type { TechnologyDefinition } from '../../types';

export const couchdbTechnologyDefinition = {
	id: "couchdb",
	name: "CouchDB",
	website: "https://couchdb.apache.org",
	description: "Apache CouchDB is an open-source document database that stores data as JSON documents.",
	icon: "CouchDB.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "couchdb:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("CouchDB\\/([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "couchdb:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("couchdb\\/([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:apache:couchdb:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
