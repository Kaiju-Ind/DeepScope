import type { TechnologyDefinition } from '../../types';

export const sweetalert2TechnologyDefinition = {
	id: "sweetalert2",
	name: "SweetAlert2",
	website: "https://sweetalert2.github.io/",
	description: "SweetAlert2 is a JavaScript library that provides customisable, visually appealing, and responsive alert and modal dialog boxes for web applications.",
	icon: "SweetAlert2.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sweetalert2:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sweetalert2(?:\\.all)?(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sweetalert2:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/npm\\/sweetalert2@([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sweetalert2:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("sweetalert2@([\\d.]+)\\/dist\\/sweetalert2(?:\\.all)(?:\\.min)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sweetalert2:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("limonte-sweetalert2\\/([\\d.]+)\\/sweetalert2(?:\\.all)(?:\\.min)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sweetalert2:html:4",
			kind: "html",
			pattern: new RegExp("<link[^>]+?href=\"[^\"]+sweetalert2(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sweetalert2:jsGlobal:5",
			kind: "jsGlobal",
			property: "Sweetalert2",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sweetalert2:dom:6",
			kind: "dom",
			selector: "link[href*='sweetalert2']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	excludes: [
		"sweetalert",
	],
} as const satisfies TechnologyDefinition;
