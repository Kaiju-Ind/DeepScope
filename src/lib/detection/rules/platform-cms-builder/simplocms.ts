import type { TechnologyDefinition } from '../../types';

export const simplocmsTechnologyDefinition = {
	id: "simplocms",
	name: "simploCMS",
	website: "https://www.simplo.cz/co-umime/",
	description: "simploCMS is a CMS utilized by a Czech team across various project types, including ecommerce development, web applications, and corporate website projects.",
	icon: "simploCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "simplocms:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^simplocms_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "simplocms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^simploCMS;", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "simplocms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^simplocms;", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
