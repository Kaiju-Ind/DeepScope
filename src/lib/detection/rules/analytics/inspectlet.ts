import type { TechnologyDefinition } from '../../types';

export const inspectletTechnologyDefinition = {
	id: "inspectlet",
	name: "Inspectlet",
	website: "https://www.inspectlet.com/",
	icon: "inspectlet.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "inspectlet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.inspectlet\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "inspectlet:html:1",
			kind: "html",
			pattern: new RegExp("<!-- (?:Begin|End) Inspectlet Embed Code -->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "inspectlet:jsGlobal:2",
			kind: "jsGlobal",
			property: "__insp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "inspectlet:jsGlobal:3",
			kind: "jsGlobal",
			property: "__inspld",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "inspectlet:html:4",
			kind: "html",
			pattern: new RegExp("<!-- (?:begin|end) inspectlet embed code -->"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
