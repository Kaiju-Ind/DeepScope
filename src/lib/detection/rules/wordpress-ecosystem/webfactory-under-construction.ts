import type { TechnologyDefinition } from '../../types';

export const webfactoryUnderConstructionTechnologyDefinition = {
	id: "webfactory-under-construction",
	name: "WebFactory Under Construction",
	website: "https://wordpress.org/plugins/under-construction-page",
	description: "WebFactory Under Construction is a WordPress plugin which allows you to create an under construction page.",
	icon: "WebFactory.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "webfactory-under-construction:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/under-construction-page/']",
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
