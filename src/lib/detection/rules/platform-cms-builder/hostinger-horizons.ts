import type { TechnologyDefinition } from '../../types';

export const hostingerHorizonsTechnologyDefinition = {
	id: "hostinger-horizons",
	name: "Hostinger Horizons",
	website: "https://www.hostinger.com/horizons",
	description: "Hostinger Horizons is a no-code web app builder designed to simplify web application creation without requiring programming knowledge.",
	icon: "Hostinger.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hostinger-horizons:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Hostinger Horizons$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hostinger-horizons:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Hostinger Horizons$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "hostinger-horizons:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^hostinger horizons$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hostinger-horizons:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^hostinger horizons$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
