import type { TechnologyDefinition } from '../../types';

export const concreteCmsTechnologyDefinition = {
	id: "concrete-cms",
	name: "Concrete CMS",
	website: "https://www.concretecms.com/",
	description: "Concrete CMS is an open-source content management system built in PHP.",
	icon: "Concrete CMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "concrete-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/concrete\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "concrete-cms:jsGlobal:1",
			kind: "jsGlobal",
			property: "CCM_IMAGE_PATH",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "concrete-cms:jsGlobal:2",
			kind: "jsGlobal",
			property: "Concrete",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "concrete-cms:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^CONCRETE5$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "concrete-cms:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^concrete5(?: - ([\\d.]+)$)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "concrete-cms:jsGlobal:5",
			kind: "jsGlobal",
			property: "ConcreteAlert",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "concrete-cms:jsGlobal:6",
			kind: "jsGlobal",
			property: "ConcreteEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "concrete-cms:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^concrete5$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:concrete5:concrete5:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
