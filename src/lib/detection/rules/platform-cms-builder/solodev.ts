import type { TechnologyDefinition } from '../../types';

export const solodevTechnologyDefinition = {
	id: "solodev",
	name: "Solodev",
	website: "https://www.solodev.com",
	description: "Solodev is a cloud-based content management system (CMS) and web experience platform.",
	icon: "Solodev.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "solodev:html:0",
			kind: "html",
			pattern: new RegExp("<div class=[\"']dynamicDiv[\"'] id=[\"']dd\\.\\d\\.\\d(?:\\.\\d)?[\"']>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "solodev:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.solodev\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "solodev:dom:2",
			kind: "dom",
			selector: "div[class*='dynamicDiv']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "solodev:html:3",
			kind: "html",
			pattern: new RegExp("<div class=[\"']dynamicdiv[\"'] id=[\"']dd\\.\\d\\.\\d(?:\\.\\d)?[\"']>"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
