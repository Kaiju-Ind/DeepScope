import type { TechnologyDefinition } from '../../types';

export const wpEngineTechnologyDefinition = {
	id: "wp-engine",
	name: "WP Engine",
	website: "https://wpengine.com",
	description: "WP Engine is a website hosting provider.",
	icon: "wpengine.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "wp-engine:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("WP Engine", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "wp-engine:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("wp engine", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
