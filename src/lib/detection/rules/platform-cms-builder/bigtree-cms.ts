import type { TechnologyDefinition } from '../../types';

export const bigtreeCmsTechnologyDefinition = {
	id: "bigtree-cms",
	name: "BigTree CMS",
	website: "https://www.bigtreecms.org",
	description: "BigTree CMS is an extremely extensible open-source CMS built on PHP and MySQL.",
	icon: "BigTree CMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bigtree-cms:jsGlobal:0",
			kind: "jsGlobal",
			property: "BigTree.Growling",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bigtree-cms:jsGlobal:1",
			kind: "jsGlobal",
			property: "BigTreeMatrix",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bigtree-cms:jsGlobal:2",
			kind: "jsGlobal",
			property: "BigTreeTagAdder",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:bigtreecms:bigtree_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
