import type { TechnologyDefinition } from '../../types';

export const powergapTechnologyDefinition = {
	id: "powergap",
	name: "Powergap",
	website: "https://powergap.de",
	icon: "Powergap.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "powergap:html:0",
			kind: "html",
			pattern: new RegExp("<a[^>]+title=\"POWERGAP"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "powergap:html:1",
			kind: "html",
			pattern: new RegExp("<input type=\"hidden\" name=\"shopid\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "powergap:dom:2",
			kind: "dom",
			selector: "input[type*='hidden'][name*='shopid']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "powergap:html:3",
			kind: "html",
			pattern: new RegExp("<a[^>]+title=\"powergap"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
