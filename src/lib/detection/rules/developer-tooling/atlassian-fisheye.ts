import type { TechnologyDefinition } from '../../types';

export const atlassianFisheyeTechnologyDefinition = {
	id: "atlassian-fisheye",
	name: "Atlassian FishEye",
	website: "https://www.atlassian.com/software/fisheye/overview/",
	icon: "Atlassian FishEye.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "atlassian-fisheye:html:0",
			kind: "html",
			pattern: new RegExp("<title>(?:Log in to )?FishEye (?:and Crucible )?([\\d.]+)?<\\/title>"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "atlassian-fisheye:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^FESESSIONID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "atlassian-fisheye:html:2",
			kind: "html",
			pattern: new RegExp("<title>(?:log in to )?fisheye (?:and crucible )?([\\d.]+)?<\\/title>"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "atlassian-fisheye:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^fesessionid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:atlassian:fisheye:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
