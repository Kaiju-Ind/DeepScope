import type { TechnologyDefinition } from '../../types';

export const incmsTechnologyDefinition = {
	id: "incms",
	name: "inCMS",
	website: "https://incms.com",
	description: "inCMS is a software platform that enables users to create, edit, and manage website content online through a web-based interface.",
	icon: "inCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "incms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.incms\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "incms:jsGlobal:1",
			kind: "jsGlobal",
			property: "inCMS.members",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "incms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("inCMS[^\\d.]*([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
