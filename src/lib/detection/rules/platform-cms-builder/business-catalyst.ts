import type { TechnologyDefinition } from '../../types';

export const businessCatalystTechnologyDefinition = {
	id: "business-catalyst",
	name: "Business Catalyst",
	website: "https://businesscatalyst.com",
	icon: "Business Catalyst.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "business-catalyst:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("CatalystScripts"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "business-catalyst:html:1",
			kind: "html",
			pattern: new RegExp("<!-- BC_OBNW -->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "business-catalyst:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("catalystscripts"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "business-catalyst:html:3",
			kind: "html",
			pattern: new RegExp("<!-- bc_obnw -->"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
