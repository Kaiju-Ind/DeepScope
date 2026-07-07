import type { TechnologyDefinition } from '../../types';

export const icegramTechnologyDefinition = {
	id: "icegram",
	name: "Icegram",
	website: "https://www.icegram.com",
	description: "Icegram is a WordPress plugin designed to grow subscribers and increase conversions.",
	icon: "Icegram.svg",
	categories: [
		"marketing-automation",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "icegram:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/icegram\\/.*main\\.min\\.js\\?ver=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "icegram:jsGlobal:1",
			kind: "jsGlobal",
			property: "Icegram",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "icegram:jsGlobal:2",
			kind: "jsGlobal",
			property: "icegram_data",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
