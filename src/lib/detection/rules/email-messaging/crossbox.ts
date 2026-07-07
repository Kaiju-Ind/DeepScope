import type { TechnologyDefinition } from '../../types';

export const crossboxTechnologyDefinition = {
	id: "crossbox",
	name: "CrossBox",
	website: "https://crossbox.io",
	description: "CrossBox is a webmail client.",
	icon: "CrossBox.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "crossbox:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("CBX-WS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "crossbox:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("cbx-ws", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
