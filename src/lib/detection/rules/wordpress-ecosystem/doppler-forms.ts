import type { TechnologyDefinition } from '../../types';

export const dopplerFormsTechnologyDefinition = {
	id: "doppler-forms",
	name: "Doppler Forms",
	website: "https://wordpress.org/plugins/doppler-form/",
	description: "The Doppler Forms plugin allows you to create fully customised subscription forms that you can add to your website or blog.",
	icon: "Doppler.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "doppler-forms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/doppler-form\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"doppler",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
