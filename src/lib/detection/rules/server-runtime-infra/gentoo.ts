import type { TechnologyDefinition } from '../../types';

export const gentooTechnologyDefinition = {
	id: "gentoo",
	name: "Gentoo",
	website: "https://www.gentoo.org",
	description: "Gentoo is a free operating system based on Linux.",
	icon: "Gentoo.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "gentoo:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("gentoo", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "gentoo:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("gentoo", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:gentoo:linux:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
