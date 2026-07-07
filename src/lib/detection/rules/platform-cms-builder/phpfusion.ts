import type { TechnologyDefinition } from '../../types';

export const phpfusionTechnologyDefinition = {
	id: "phpfusion",
	name: "PHPFusion",
	website: "https://phpfusion.com",
	description: "PHPFusion is an open-source content management system (CMS) and web application framework written in PHP.",
	icon: "PHPFusion.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "phpfusion:html:0",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"[^>]+phpfusion"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpfusion:html:1",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"[^>]+php-fusion"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpfusion:header:2",
			kind: "header",
			key: "X-PHPFusion",
			valuePattern: new RegExp("(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "phpfusion:header:3",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("PHPFusion (.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "phpfusion:header:4",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("PHP(?:-)?Fusion (.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "phpfusion:html:5",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"[^>]+php-fusion"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpfusion:html:6",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"[^>]+phpfusion"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpfusion:header:7",
			kind: "header",
			key: "x-phpfusion",
			valuePattern: new RegExp("(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "phpfusion:header:8",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("phpfusion (.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:phpfusion:phpfusion:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
