import type { TechnologyDefinition } from '../../types';

export const mongodbTechnologyDefinition = {
	id: "mongodb",
	name: "MongoDB",
	website: "https://www.mongodb.org",
	description: "MongoDB is a document-oriented NoSQL database used for high volume data storage.",
	icon: "MongoDB.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [],
	metadata: {
		cpe: "cpe:2.3:a:mongodb:mongodb:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
