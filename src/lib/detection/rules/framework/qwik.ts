import type { TechnologyDefinition } from '../../types';

export const qwikTechnologyDefinition = {
	id: "qwik",
	name: "Qwik",
	website: "https://qwik.builder.io",
	description: "Qwik is designed for the fastest possible page load time, by delivering pure HTML with near 0 JavaScript.",
	icon: "Qwik.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "qwik:dom:0",
			kind: "dom",
			selector: "[q\\:container], [q\\:version], [q\\:base], [q\\:render], script[type='qwik/json']",
			description: "Qwik SSR/runtime attributes are present on the rendered document.",
		},
		{
			id: "qwik:html:1",
			kind: "html",
			pattern: new RegExp("\\bq:(?:container|version|base|render|manifest)=[\"']", "i"),
			confidence: 95,
			description: "Document HTML contains Qwik resumability attributes.",
		},
		{
			id: "qwik:html:2",
			kind: "html",
			pattern: new RegExp("<script[^>]+type=[\"']qwik/json[\"']", "i"),
			confidence: 95,
			description: "Document HTML contains Qwik serialized state.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:builder:qwik:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
