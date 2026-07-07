import type { TechnologyDefinition } from '../../types';

export const xanarioTechnologyDefinition = {
	id: "xanario",
	name: "Xanario",
	website: "https://xanario.de",
	description: "Xanario is an ecommerce platform that offers a comprehensive system for online shop solutions, including CMS, CRM, shop management, blog integration, POS system, and warehouse management.",
	icon: "Xanario.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "xanario:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("xanario shopsoftware", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
