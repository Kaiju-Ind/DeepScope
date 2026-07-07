import type { TechnologyDefinition } from '../../types';

export const freakoutTechnologyDefinition = {
	id: "freakout",
	name: "FreakOut",
	website: "https://www.fout.co.jp",
	description: "FreakOut is a marketing technology company with programmatic solutions (DSP,SSP) that delivers in-feed display and video formats across global publishers.",
	icon: "FreakOut.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "freakout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fout\\.jp\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "freakout:dom:1",
			kind: "dom",
			selector: "img[src*='.fout.jp/'], link[href*='.fout.jp']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "freakout:jsGlobal:2",
			kind: "jsGlobal",
			property: "FOut",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "freakout:jsGlobal:3",
			kind: "jsGlobal",
			property: "_fout_jsurl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "freakout:jsGlobal:4",
			kind: "jsGlobal",
			property: "_fout_queue",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
