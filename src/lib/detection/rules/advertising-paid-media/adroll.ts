import type { TechnologyDefinition } from '../../types';

export const adrollTechnologyDefinition = {
	id: "adroll",
	name: "AdRoll",
	website: "https://adroll.com",
	description: "AdRoll is a digital marketing technology platform that specializes in retargeting.",
	icon: "AdRoll.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adroll:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:a|s)\\.adroll\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adroll:dom:1",
			kind: "dom",
			selector: "link[href*='.adroll.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adroll:jsGlobal:2",
			kind: "jsGlobal",
			property: "adroll_adv_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adroll:jsGlobal:3",
			kind: "jsGlobal",
			property: "adroll_pix_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adroll:jsGlobal:4",
			kind: "jsGlobal",
			property: "adroll_version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adroll:scriptContent:5",
			kind: "scriptContent",
			pattern: new RegExp("(?:d|s)\\.adroll\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
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
