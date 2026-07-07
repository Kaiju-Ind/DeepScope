import type { TechnologyDefinition } from '../../types';

export const webfactoryMaintenanceTechnologyDefinition = {
	id: "webfactory-maintenance",
	name: "WebFactory Maintenance",
	website: "https://wordpress.org/plugins/maintenance",
	description: "WebFactory Maintenance is a WordPress plugin which allows you to create an maintenance page.",
	icon: "WebFactory.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "webfactory-maintenance:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/maintenance/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "webfactory-maintenance:jsGlobal:1",
			kind: "jsGlobal",
			property: "mtnc_front_options",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
