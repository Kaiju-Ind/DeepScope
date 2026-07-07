import type { TechnologyDefinition } from '../../types';

export const framerSitesTechnologyDefinition = {
	id: "framer-sites",
	name: "Framer Sites",
	website: "https://framer.com/sites",
	description: "Framer is primarily a design and prototyping tool. It allows you to design interactive prototypes of websites and applications using production components and real data.",
	icon: "Framer Sites.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "framer-sites:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("framerusercontent\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "framer-sites:jsGlobal:1",
			kind: "jsGlobal",
			property: "Framer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "framer-sites:jsGlobal:2",
			kind: "jsGlobal",
			property: "Framer.Animatable",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "framer-sites:jsGlobal:3",
			kind: "jsGlobal",
			property: "Framer.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "framer-sites:jsGlobal:4",
			kind: "jsGlobal",
			property: "__framer_importFromPackage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "framer-sites:header:5",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Framer\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "framer-sites:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Framer", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "framer-sites:header:7",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^framer\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "framer-sites:meta:8",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^framer", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: false,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
