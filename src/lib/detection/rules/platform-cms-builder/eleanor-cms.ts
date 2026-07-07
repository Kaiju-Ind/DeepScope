import type { TechnologyDefinition } from '../../types';

export const eleanorCmsTechnologyDefinition = {
	id: "eleanor-cms",
	name: "Eleanor CMS",
	website: "https://eleanor-cms.ru",
	icon: "Eleanor CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "eleanor-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Eleanor", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "eleanor-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("eleanor", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:eleanor-cms:eleanor_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
