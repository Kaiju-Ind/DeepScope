import type { TechnologyDefinition } from '../../types';

export const sinatraTechnologyDefinition = {
	id: "sinatra",
	name: "Sinatra",
	website: "https://try.sinatrawp.com",
	description: "Sinatra is a lightweight and highly customizable multi-purpose WordPress theme.",
	icon: "Sinatra.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "sinatra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/sinatra\\/.+sinatra\\.min\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sinatra:jsGlobal:1",
			kind: "jsGlobal",
			property: "sinatraSlideUp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sinatra:jsGlobal:2",
			kind: "jsGlobal",
			property: "sinatra_vars.nonce",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
