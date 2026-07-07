import type { TechnologyDefinition } from '../../types';

export const civicrmPluginsTechnologyDefinition = {
	id: "civicrm-plugins",
	name: "CiviCRM plugins",
	website: "https://wordpress.org/plugins/search/civicrm/",
	description: "CiviCRM is a web-based suite of internationalised open-source software for constituency relationship management.",
	icon: "CiviCRM.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "civicrm-plugins:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/plugins\\/(?:[\\w\\-]+)?civicrm(?:[\\w\\-]+)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"civicrm",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
