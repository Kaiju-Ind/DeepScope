import type { TechnologyDefinition } from '../../types';

export const melisPlatformTechnologyDefinition = {
	id: "melis-platform",
	name: "Melis Platform",
	website: "https://www.melistechnology.com/",
	icon: "melis-platform.svg",
	categories: [
		"platform-cms-builder",
		"content-publishing",
		"marketing-automation",
	],
	rules: [
		{
			id: "melis-platform:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Rendered with Melis CMS V2"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "melis-platform:html:1",
			kind: "html",
			pattern: new RegExp("<!-- Rendered with Melis Platform"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "melis-platform:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Melis Platform\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "melis-platform:meta:3",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("^Melis CMS\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "melis-platform:jsGlobal:4",
			kind: "jsGlobal",
			property: "MelisGdprBanner",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "melis-platform:jsGlobal:5",
			kind: "jsGlobal",
			property: "melisGdprBanner_init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "melis-platform:html:6",
			kind: "html",
			pattern: new RegExp("<!-- rendered with melis cms v2"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "melis-platform:html:7",
			kind: "html",
			pattern: new RegExp("<!-- rendered with melis platform"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "melis-platform:meta:8",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^melis platform\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "melis-platform:meta:9",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("^melis cms\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "melis-platform:meta:10",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Melis Platform$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:melisplatform:melisplatform:*:*:*:*:*:*:*:*",
	},
	implies: [
		"apache-http-server",
		"laravel",
		"mysql",
		"php",
		"symfony",
		"zend",
	],
} as const satisfies TechnologyDefinition;
