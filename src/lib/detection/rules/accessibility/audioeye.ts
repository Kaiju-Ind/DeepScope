import type { TechnologyDefinition } from '../../types';

export const audioeyeTechnologyDefinition = {
	id: "audioeye",
	name: "AudioEye",
	website: "https://www.audioeye.com",
	description: "AudioEye is an accessibility overlay which claims to provide ADA and WCAG accessibility compliance.",
	icon: "AudioEye.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "audioeye:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\.)?audioeye\\.com\\/(?:ae\\.js)?"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "audioeye:dom:1",
			kind: "dom",
			selector: "iframe[src*='.audioeye.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "audioeye:jsGlobal:2",
			kind: "jsGlobal",
			property: "$ae.attrHooks",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "audioeye:jsGlobal:3",
			kind: "jsGlobal",
			property: "window.AudioEye.version",
			valuePattern: new RegExp("^([\\d.]+)-\\d+$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
