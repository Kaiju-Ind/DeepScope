import type { TechnologyDefinition } from '../../types';

export const seamlesscmsTechnologyDefinition = {
	id: "seamlesscms",
	name: "SeamlessCMS",
	website: "https://www.seamlesscms.com",
	icon: "SeamlessCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "seamlesscms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Seamless\\.?CMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "seamlesscms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^seamless\\.?cms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
