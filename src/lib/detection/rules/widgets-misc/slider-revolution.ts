import type { TechnologyDefinition } from '../../types';

export const sliderRevolutionTechnologyDefinition = {
	id: "slider-revolution",
	name: "Slider Revolution",
	website: "https://www.sliderrevolution.com",
	description: "Slider Revolution is a flexible and highly customisable slider.",
	icon: "Slider Revolution.svg",
	categories: [
		"widgets-misc",
		"content-publishing",
	],
	rules: [
		{
			id: "slider-revolution:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/revslider\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "slider-revolution:jsGlobal:1",
			kind: "jsGlobal",
			property: "RS_MODULES.main.version",
			valuePattern: new RegExp("^Slider Revolution\\s([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "slider-revolution:jsGlobal:2",
			kind: "jsGlobal",
			property: "revapi1",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "slider-revolution:jsGlobal:3",
			kind: "jsGlobal",
			property: "revapi2",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "slider-revolution:jsGlobal:4",
			kind: "jsGlobal",
			property: "revapi3",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "slider-revolution:jsGlobal:5",
			kind: "jsGlobal",
			property: "revapi4",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "slider-revolution:jsGlobal:6",
			kind: "jsGlobal",
			property: "revapi5",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "slider-revolution:jsGlobal:7",
			kind: "jsGlobal",
			property: "revslider_showDoubleJqueryError",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "slider-revolution:meta:8",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Powered\\sby\\sSlider Revolution\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "slider-revolution:scriptSrc:9",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.themepunch\\.revolution\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "slider-revolution:jsGlobal:10",
			kind: "jsGlobal",
			property: "SR7.version",
			valuePattern: new RegExp("^Slider Revolution\\s([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "slider-revolution:meta:11",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("powered\\sby\\sslider revolution\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
