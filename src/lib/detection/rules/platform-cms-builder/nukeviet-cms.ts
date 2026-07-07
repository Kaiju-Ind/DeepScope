import type { TechnologyDefinition } from '../../types';

export const nukevietCmsTechnologyDefinition = {
	id: "nukeviet-cms",
	name: "Nukeviet CMS",
	website: "https://nukeviet.vn/en/",
	description: "NukeViet CMS is a Vietnamese content management system.",
	icon: "Nukeviet CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nukeviet-cms:jsGlobal:0",
			kind: "jsGlobal",
			property: "nv_DigitalClock",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nukeviet-cms:jsGlobal:1",
			kind: "jsGlobal",
			property: "nv_is_change_act_confirm",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nukeviet-cms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("NukeViet v([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "nukeviet-cms:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("nukeviet v([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:nukeviet:nukeviet:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
