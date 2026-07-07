import type { TechnologyDefinition } from '../../types';

export const experiencedcmsTechnologyDefinition = {
	id: "experiencedcms",
	name: "experiencedCMS",
	website: "https://experiencedcms.berkearas.de",
	icon: "experiencedCMS_Logo.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "experiencedcms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^experiencedCMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "experiencedcms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^experiencedcms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:experiencedcms:experiencedcms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
