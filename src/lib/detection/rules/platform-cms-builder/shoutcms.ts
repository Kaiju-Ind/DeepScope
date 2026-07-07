import type { TechnologyDefinition } from '../../types';

export const shoutcmsTechnologyDefinition = {
	id: "shoutcms",
	name: "ShoutCMS",
	website: "https://shoutcms.com",
	description: "ShoutCMS is a web content management system (CMS) that allows users to build and manage websites.",
	icon: "ShoutCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoutcms:jsGlobal:0",
			kind: "jsGlobal",
			property: "Shout.addHeaderButton",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shoutcms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Shoutcms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shoutcms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("shoutcms", "i"),
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
