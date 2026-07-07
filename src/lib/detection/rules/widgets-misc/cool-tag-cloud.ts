import type { TechnologyDefinition } from '../../types';

export const coolTagCloudTechnologyDefinition = {
	id: "cool-tag-cloud",
	name: "Cool Tag Cloud",
	website: "https://wordpress.org/plugins/cool-tag-cloud",
	description: "A simple tag cloud system for WordPress.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "cool-tag-cloud:dom:0",
			kind: "dom",
			selector: "link#cool-tag-cloud-css[href*='/wp-content/plugins/cool-tag-cloud/'], .cool-tag-cloud, .widget_cool_tag_cloud, .cool-tag-cloud-open, .cool-tag-cloud-close, .cool-tag-cloud-inner",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
