import type { TechnologyDefinition } from '../../types';

export const headjsTechnologyDefinition = {
	id: "headjs",
	name: "HeadJS",
	website: "https://headjs.github.io",
	description: "HeadJS is a JavaScript library that optimizes web performance by managing the loading and execution of scripts and stylesheets to ensure faster page loads and efficient resource handling.",
	icon: "HeadJS.png",
	categories: [
		"widgets-misc",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "headjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("head\\.(?:core|load)(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "headjs:html:1",
			kind: "html",
			pattern: new RegExp("<[^>]*data-headjs-load"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "headjs:jsGlobal:2",
			kind: "jsGlobal",
			property: "head.browser.name",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
