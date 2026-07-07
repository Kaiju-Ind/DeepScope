import type { TechnologyDefinition } from '../../types';

export const htmxTechnologyDefinition = {
	id: "htmx",
	name: "Htmx",
	website: "https://htmx.org",
	description: "Htmx is a JavaScript library for performing AJAX requests, triggering CSS transitions, and invoking WebSocket and server-sent events directly from HTML elements.",
	icon: "Htmx.svg",
	categories: [
		"api-pattern",
		"developer-tooling",
	],
	rules: [
		{
			id: "htmx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/htmx\\.org@([\\d.]+)|htmx(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "htmx:dom:1",
			kind: "dom",
			selector: "script[data-src*='/dist/htmx.min.js']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "htmx:jsGlobal:2",
			kind: "jsGlobal",
			property: "htmx",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "htmx:jsGlobal:3",
			kind: "jsGlobal",
			property: "htmx.version",
			valuePattern: new RegExp("^([\\d.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "htmx:dom:4",
			kind: "dom",
			selector: "[hx-get], [hx-post], [hx-put], [hx-patch], [hx-delete], [data-hx-get], [data-hx-post], [data-hx-put], [data-hx-patch], [data-hx-delete]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
