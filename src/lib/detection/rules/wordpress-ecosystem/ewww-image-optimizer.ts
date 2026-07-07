import type { TechnologyDefinition } from '../../types';

export const ewwwImageOptimizerTechnologyDefinition = {
	id: "ewww-image-optimizer",
	name: "EWWW Image Optimizer",
	website: "https://github.com/nosilver4u/ewww-image-optimizer",
	description: "EWWW Image Optimizer is an image optimisation WordPress plugin designed to improve the performance of your website.",
	icon: "EWWW Image Optimizer.png",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "ewww-image-optimizer:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/ewww\\-image\\-optimizer/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ewww\\-image\\-optimizer/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/ewww-image-optimizer/.",
		},
		{
			id: "ewww-image-optimizer:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/ewww\\-image\\-optimizer/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ewww\\-image\\-optimizer/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/ewww-image-optimizer/.",
		},
		{
			id: "ewww-image-optimizer:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/ewww\\-image\\-optimizer/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ewww\\-image\\-optimizer/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/ewww-image-optimizer/.",
		},
		{
			id: "ewww-image-optimizer:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/ewww\\-image\\-optimizer/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ewww\\-image\\-optimizer/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/ewww-image-optimizer/.",
		},
		{
			id: "ewww-image-optimizer:jsGlobal:4",
			kind: "jsGlobal",
			property: "ewww_webp_supported",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
