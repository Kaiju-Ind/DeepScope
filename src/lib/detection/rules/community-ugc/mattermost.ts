import type { TechnologyDefinition } from '../../types';

export const mattermostTechnologyDefinition = {
	id: "mattermost",
	name: "Mattermost",
	website: "https://about.mattermost.com",
	icon: "mattermost.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "mattermost:html:0",
			kind: "html",
			pattern: new RegExp("<noscript> To use Mattermost, please enable JavaScript\\. <\\/noscript>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mattermost:jsGlobal:1",
			kind: "jsGlobal",
			property: "mm_config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mattermost:jsGlobal:2",
			kind: "jsGlobal",
			property: "mm_current_user_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mattermost:jsGlobal:3",
			kind: "jsGlobal",
			property: "mm_license",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mattermost:jsGlobal:4",
			kind: "jsGlobal",
			property: "mm_user",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mattermost:jsGlobal:5",
			kind: "jsGlobal",
			property: "mattermost_webapp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mattermost:jsGlobal:6",
			kind: "jsGlobal",
			property: "webpackChunkmattermost_webapp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mattermost:meta:7",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Mattermost$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mattermost:html:8",
			kind: "html",
			pattern: new RegExp("<noscript> to use mattermost, please enable javascript\\. <\\/noscript>"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:jenkins:mattermost:*:*:*:*:*:*:*:*",
	},
	implies: [
		"go",
		"react",
	],
} as const satisfies TechnologyDefinition;
