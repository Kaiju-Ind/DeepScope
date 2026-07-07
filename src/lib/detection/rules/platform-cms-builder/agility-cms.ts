import type { TechnologyDefinition } from '../../types';

export const agilityCmsTechnologyDefinition = {
	id: "agility-cms",
	name: "Agility CMS",
	website: "https://agilitycms.com",
	description: "Agility CMS is an enterprise-level content management system provider offering scalable solutions for managing digital content across multiple platforms.",
	icon: "Agility.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "agility-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.agilitycms\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "agility-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Agility CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "agility-cms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^agility cms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
