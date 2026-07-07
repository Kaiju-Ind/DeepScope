import type { TechnologyDefinition } from '../../types';

export const forkCmsTechnologyDefinition = {
	id: "fork-cms",
	name: "Fork CMS",
	website: "https://www.fork-cms.com",
	description: "Fork CMS is an open-source content management system.",
	icon: "ForkCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fork-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Fork CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "fork-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^fork cms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:fork-cms:fork_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"symfony",
	],
} as const satisfies TechnologyDefinition;
