import type { TechnologyDefinition } from '../../types';

export const redHatTechnologyDefinition = {
	id: "red-hat",
	name: "Red Hat",
	website: "https://www.redhat.com",
	description: "Red Hat is an open-source Linux operating system.",
	icon: "Red Hat.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "red-hat:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Red Hat", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "red-hat:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Red Hat", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "red-hat:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("red hat", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "red-hat:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("red hat", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:redhat:linux:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
