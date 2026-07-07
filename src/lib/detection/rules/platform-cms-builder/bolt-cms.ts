import type { TechnologyDefinition } from '../../types';

export const boltCmsTechnologyDefinition = {
	id: "bolt-cms",
	name: "Bolt CMS",
	website: "https://bolt.cm",
	description: "Bolt is an open-source content management system (CMS) focused on simplicity and flexibility for developers building and managing websites and web applications.",
	icon: "Bolt CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bolt-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Bolt", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bolt-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("bolt", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:bolt:bolt:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
