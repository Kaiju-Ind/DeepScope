import type { TechnologyDefinition } from '../../types';

export const localgovDrupalTechnologyDefinition = {
	id: "localgov-drupal",
	name: "LocalGov Drupal",
	website: "https://localgovdrupal.org/products/localgov-drupal-cms",
	description: "LocalGov Drupal is a web publishing platform for councils designed to enhance citizen experience, improve service delivery, and reduce operational costs.",
	icon: "LocalGovDrupal.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [],
	metadata: {
		oss: true,
	},
	requires: [
		"drupal",
	],
} as const satisfies TechnologyDefinition;
