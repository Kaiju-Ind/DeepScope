import type { TechnologyDefinition } from '../../types';

export const nprogressTechnologyDefinition = {
	id: "nprogress",
	name: "NProgress",
	website: "https://ricostacruz.com/nprogress/",
	description: "NProgress is a JavaScript library that displays a nanoscopic progress bar at the top of websites or web applications. It includes trickle animations to indicate loading activity, enhancing user experience by showing that content is being loaded.",
	icon: "NProgress.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "nprogress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/nprogress\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nprogress:jsGlobal:1",
			kind: "jsGlobal",
			property: "NProgress.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
