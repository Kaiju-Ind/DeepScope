import type { TechnologyDefinition } from '../../types';

export const hotaruCmsTechnologyDefinition = {
	id: "hotaru-cms",
	name: "Hotaru CMS",
	website: "https://hotarucms.org",
	icon: "Hotaru CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hotaru-cms:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^hotaru_mobile$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "hotaru-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Hotaru CMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "hotaru-cms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("hotaru cms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:hotarucms:hotarucms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
