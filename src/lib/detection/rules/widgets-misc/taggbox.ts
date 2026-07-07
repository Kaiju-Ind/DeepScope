import type { TechnologyDefinition } from '../../types';

export const taggboxTechnologyDefinition = {
	id: "taggbox",
	name: "Taggbox",
	website: "https://taggbox.com/",
	description: "Taggbox is an UGC platform to collect, curate, manage rights, and publish user-generated content marketing campaigns across multiple channels.",
	icon: "Taggbox.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "taggbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.taggbox\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "taggbox:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("taggbox\\.com\\/app\\/js\\/embed\\.min\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "taggbox:url:2",
			kind: "url",
			pattern: new RegExp("\\.taggbox\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "taggbox:jsGlobal:3",
			kind: "jsGlobal",
			property: "taggboxAjaxurl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
