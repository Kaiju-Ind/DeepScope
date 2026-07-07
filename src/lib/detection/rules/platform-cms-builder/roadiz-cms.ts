import type { TechnologyDefinition } from '../../types';

export const roadizCmsTechnologyDefinition = {
	id: "roadiz-cms",
	name: "Roadiz CMS",
	website: "https://www.roadiz.io",
	description: "Roadiz CMS is a polymorphic CMS based on Symfony Flex, Doctrine ORM, API Platform, and Twig.",
	icon: "Roadiz CMS.png",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "roadiz-cms:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Roadiz CMS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "roadiz-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Roadiz ?(?:master|develop)? v?([0-9\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "roadiz-cms:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("roadiz cms", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "roadiz-cms:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^roadiz ?(?:master|develop)? v?([0-9\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
		"symfony",
	],
} as const satisfies TechnologyDefinition;
