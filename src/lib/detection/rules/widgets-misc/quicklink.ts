import type { TechnologyDefinition } from '../../types';

export const quicklinkTechnologyDefinition = {
	id: "quicklink",
	name: "Quicklink",
	website: "https://getquick.link/",
	description: "Quicklink is a JS library which aims to be a drop-in solution for sites to prefetch links based on what is in the user's viewport.",
	icon: "Quicklink.svg",
	categories: [
		"widgets-misc",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "quicklink:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("quicklink@([\\d.]+)\\/dist\\/quicklink.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "quicklink:jsGlobal:1",
			kind: "jsGlobal",
			property: "drupalSettings.quicklink",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quicklink:jsGlobal:2",
			kind: "jsGlobal",
			property: "quicklink",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
