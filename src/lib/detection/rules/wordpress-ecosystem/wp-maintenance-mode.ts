import type { TechnologyDefinition } from '../../types';

export const wpMaintenanceModeTechnologyDefinition = {
	id: "wp-maintenance-mode",
	name: "WP Maintenance Mode",
	website: "https://github.com/andrianvaleanu/WP-Maintenance-Mode",
	description: "WP Maintenance Mode is a WordPress plugin which add a maintenance page to your blog.",
	icon: "WP Maintenance Mode.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-maintenance-mode:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wp-maintenance-mode\\/.+wpmm\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wp-maintenance-mode:jsGlobal:1",
			kind: "jsGlobal",
			property: "wpmm_vars",
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
