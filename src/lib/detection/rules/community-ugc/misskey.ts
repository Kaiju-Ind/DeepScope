import type { TechnologyDefinition } from '../../types';

export const misskeyTechnologyDefinition = {
	id: "misskey",
	name: "Misskey",
	website: "https://join.misskey.page/",
	description: "Misskey is a distributed microblogging platform.",
	icon: "Misskey.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "misskey:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Thank you for using Misskey! @syuilo -->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "misskey:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("Misskey", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "misskey:html:2",
			kind: "html",
			pattern: new RegExp("<!-- thank you for using misskey! @syuilo -->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "misskey:meta:3",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("misskey", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:misskey:misskey:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
