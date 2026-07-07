import type { TechnologyDefinition } from '../../types';

export const xiunoBbsTechnologyDefinition = {
	id: "xiuno-bbs",
	name: "Xiuno BBS",
	website: "https://xiunobbs.cn",
	description: "Xiunobbs is an open-source, lightweight forum software designed for easy community management and customization.",
	icon: "Xiuno BBS.svg",
	categories: [
		"platform-cms-builder",
		"community-ugc",
	],
	rules: [
		{
			id: "xiuno-bbs:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("XiunoBBS\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "xiuno-bbs:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("xiunobbs\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:xiuno:xiunobbs:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
