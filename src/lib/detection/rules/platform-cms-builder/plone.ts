import type { TechnologyDefinition } from '../../types';

export const ploneTechnologyDefinition = {
	id: "plone",
	name: "Plone",
	website: "https://plone.org/",
	description: "Plone is a free and open source content management system (CMS) built on top of the Zope application server.",
	icon: "Plone.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "plone:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Plone", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "plone:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/\\+\\+resource\\+\\+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plone:dom:2",
			kind: "dom",
			selector: "link[href^='/++resource++']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "plone:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("plone", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:plone:plone:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
