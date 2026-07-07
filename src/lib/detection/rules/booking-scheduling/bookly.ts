import type { TechnologyDefinition } from '../../types';

export const booklyTechnologyDefinition = {
	id: "bookly",
	name: "Bookly",
	website: "https://www.booking-wp-plugin.com",
	description: "Bookly is a WordPress scheduling plugin that allows you to accept online reservations on your website and automate your booking system.",
	icon: "bookly.png",
	categories: [
		"booking-scheduling",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "bookly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/bookly-responsive-appointment-booking-tool\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bookly:jsGlobal:1",
			kind: "jsGlobal",
			property: "BooklyL10n.daysShort",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bookly:jsGlobal:2",
			kind: "jsGlobal",
			property: "bookly",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bookly:jsGlobal:3",
			kind: "jsGlobal",
			property: "booklyCustomerProfile",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
		],
		cpe: "cpe:2.3:a:booking-wp-plugin:bookly:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
