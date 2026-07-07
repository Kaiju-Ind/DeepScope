import type { TechnologyDefinition } from '../../types';

export const daphneTechnologyDefinition = {
	id: "daphne",
	name: "Daphne",
	website: "https://github.com/django/daphne",
	description: "Daphne is an ASGI server used with Django and Channels.",
	icon: "daphne.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "daphne:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Daphne", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "daphne:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("daphne", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"python",
		"twistedweb",
		"zope",
	],
} as const satisfies TechnologyDefinition;
