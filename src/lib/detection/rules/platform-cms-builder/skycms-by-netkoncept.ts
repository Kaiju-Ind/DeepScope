import type { TechnologyDefinition } from '../../types';

export const skycmsByNetkonceptTechnologyDefinition = {
	id: "skycms-by-netkoncept",
	name: "SkyCMS by Netkoncept",
	website: "https://www.netkoncept.com/86/63/technologia-skycms.html",
	description: "Polish SaaS content-management platform developed by NETKONCEPT, primarily used by public administration websites and Public Information Bulletin (BIP) portals.",
	icon: "SkyCMS_by_netkoncept.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "skycms-by-netkoncept:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^skycms_LanguageId$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "skycms-by-netkoncept:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^skycms_PageCounter$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "skycms-by-netkoncept:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^skycms_languageid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "skycms-by-netkoncept:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^skycms_pagecounter$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
