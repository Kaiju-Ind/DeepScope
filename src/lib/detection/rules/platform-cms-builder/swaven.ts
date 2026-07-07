import type { TechnologyDefinition } from '../../types';

export const swavenTechnologyDefinition = {
	id: "swaven",
	name: "Swaven",
	website: "https://swaven.com",
	description: "Swaven is a Where-To-Buy technology platform that enables brands to connect consumers with online and offline purchasing options.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "swaven:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widgets\\.swaven\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "swaven:header:1",
			kind: "header",
			key: "Set-Cookie",
			valuePattern: new RegExp("\\.swaven\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "swaven:header:2",
			kind: "header",
			key: "set-cookie",
			valuePattern: new RegExp("\\.swaven\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
