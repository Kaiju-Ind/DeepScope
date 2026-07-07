import type { TechnologyDefinition } from '../../types';

export const wpCloudTechnologyDefinition = {
	id: "wp-cloud",
	name: "wp.cloud",
	website: "https://wp.cloud/",
	description: "WordPress-first cloud hosting.",
	icon: "wp-cloud.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "wp-cloud:header:0",
			kind: "header",
			key: "host-header",
			valuePattern: new RegExp("wpcloud", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
