import type { TechnologyDefinition } from '../../types';

export const pdfJsTechnologyDefinition = {
	id: "pdf-js",
	name: "PDF.js",
	website: "https://mozilla.github.io/pdf.js/",
	icon: "PDF.js.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pdf-js:html:0",
			kind: "html",
			pattern: new RegExp("<\\/div>\\s*<!-- outerContainer -->\\s*<div\\s*id=\"printContainer\"><\\/div>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "pdf-js:url:1",
			kind: "url",
			pattern: new RegExp("\\/web\\/viewer\\.html?file=[^&]\\.pdf"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "pdf-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "PDFJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pdf-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "PDFJS.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pdf-js:jsGlobal:4",
			kind: "jsGlobal",
			property: "_pdfjsCompatibilityChecked",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pdf-js:jsGlobal:5",
			kind: "jsGlobal",
			property: "pdfjsDistBuildPdf.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pdf-js:jsGlobal:6",
			kind: "jsGlobal",
			property: "pdfjsLib.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pdf-js:dom:7",
			kind: "dom",
			selector: "div[id*='printContainer']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pdf-js:html:8",
			kind: "html",
			pattern: new RegExp("<\\/div>\\s*<!-- outercontainer -->\\s*<div\\s*id=\"printcontainer\"><\\/div>"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
