import type { TechnologyDefinition } from '../../types';

export const apostrophecmsTechnologyDefinition = {
	id: "apostrophecms",
	name: "ApostropheCMS",
	website: "https://apostrophecms.com",
	description: "ApostropheCMS is a powerful website builder platform built on an enterprise open source CMS.",
	icon: "ApostropheCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "apostrophecms:jsGlobal:0",
			kind: "jsGlobal",
			property: "APOS_DIALOGS.dialogAttributes",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apostrophecms:jsGlobal:1",
			kind: "jsGlobal",
			property: "apos.csrfCookieName",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:apostrophecms:apostrophecms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
