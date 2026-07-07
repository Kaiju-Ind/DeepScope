import type { TechnologyDefinition } from '../../types';

export const jqueryMigrateTechnologyDefinition = {
	id: "jquery-migrate",
	name: "jQuery Migrate",
	website: "https://github.com/jquery/jquery-migrate",
	description: "Query Migrate is a javascript library that allows you to preserve the compatibility of your jQuery code developed for versions of jQuery older than 1.9.",
	icon: "jQuery.svg",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "jquery-migrate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery[.-]migrate(?:-([\\d.]+))?(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				template: "$1?$1:$2",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-migrate:jsGlobal:1",
			kind: "jsGlobal",
			property: "jQuery.migrateVersion",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jquery-migrate:jsGlobal:2",
			kind: "jsGlobal",
			property: "jQuery.migrateWarnings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jquery-migrate:jsGlobal:3",
			kind: "jsGlobal",
			property: "jqueryMigrate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jquery-migrate:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("jquery-migrate(?:\\.min)?(?:-)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-migrate:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("jquery-migrate(?:\\.min)?(?:-?((?:\\d+\\.)+\\d+))?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
