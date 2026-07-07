import type { TechnologyDefinition } from '../../types';

export const zurbFoundationTechnologyDefinition = {
	id: "zurb-foundation",
	name: "ZURB Foundation",
	website: "https://foundation.zurb.com",
	description: "Zurb Foundation is used to prototype in the browser. Allows rapid creation of websites or applications while leveraging mobile and responsive technology. The front end framework is the collection of HTML, CSS, and Javascript containing design patterns.",
	icon: "ZURB Foundation.png",
	categories: [
		"styling-library",
		"component-library",
	],
	rules: [
		{
			id: "zurb-foundation:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]+foundation[^>\"]+css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "zurb-foundation:html:1",
			kind: "html",
			pattern: new RegExp("<div [^>]*class=\"[^\"]*(?:small|medium|large)-\\d{1,2} columns"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "zurb-foundation:jsGlobal:2",
			kind: "jsGlobal",
			property: "Foundation.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zurb-foundation:dom:3",
			kind: "dom",
			selector: "link[href*='foundation'][href*='css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
