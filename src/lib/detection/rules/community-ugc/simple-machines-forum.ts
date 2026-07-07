import type { TechnologyDefinition } from '../../types';

export const simpleMachinesForumTechnologyDefinition = {
	id: "simple-machines-forum",
	name: "Simple Machines Forum",
	website: "https://www.simplemachines.org",
	description: "Simple Machines Forum is a free open-source software, used for community forums and is written in PHP.",
	icon: "Simple Machines Forum.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "simple-machines-forum:dom:0",
			kind: "dom",
			selector: "li > span > a[title='Simple Machines Forum']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "simple-machines-forum:text:1",
			kind: "text",
			pattern: new RegExp("^SMF\\s([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page text contains a known technology marker.",
		},
		{
			id: "simple-machines-forum:jsGlobal:2",
			kind: "jsGlobal",
			property: "smf_avatarResize",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "simple-machines-forum:jsGlobal:3",
			kind: "jsGlobal",
			property: "smf_default_theme_url",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "simple-machines-forum:jsGlobal:4",
			kind: "jsGlobal",
			property: "smf_theme_url",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:simplemachines:simple_machine_forum:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
