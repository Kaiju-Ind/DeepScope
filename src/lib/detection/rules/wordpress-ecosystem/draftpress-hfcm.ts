import type { TechnologyDefinition } from '../../types';

export const draftpressHfcmTechnologyDefinition = {
	id: "draftpress-hfcm",
	name: "Draftpress HFCM",
	website: "https://draftpress.com/products/header-footer-code-manager-pro/",
	description: "Header Footer Code Manager by Draftpress is an easy interface to add snippets to the header or footer or above or below the content of your page.",
	icon: "Draftpress.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "draftpress-hfcm:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]*HFCM\\sby\\s99\\sRobots"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "draftpress-hfcm:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^>]*hfcm\\sby\\s99\\srobots"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
