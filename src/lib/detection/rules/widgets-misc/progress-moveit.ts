import type { TechnologyDefinition } from '../../types';

export const progressMoveitTechnologyDefinition = {
	id: "progress-moveit",
	name: "Progress MOVEit",
	website: "https://www.progress.com/moveit",
	description: "Progress MOVEit is a managed file transfer solution that enables secure and compliant transfer of sensitive files while providing automation, central management, and auditing capabilities.",
	icon: "Progress.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "progress-moveit:header:0",
			kind: "header",
			key: "X-Moveitisapi-Version",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "progress-moveit:meta:1",
			kind: "meta",
			key: "apple-itunes-app",
			valuePattern: new RegExp("app-id=1500056420", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "progress-moveit:meta:2",
			kind: "meta",
			key: "google-play-app",
			valuePattern: new RegExp("app-id=com\\.progress\\.moveit\\.transfer\\.dev\\.appid", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "progress-moveit:header:3",
			kind: "header",
			key: "x-moveitisapi-version",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
