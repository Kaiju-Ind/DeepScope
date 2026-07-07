import type { TechnologyDefinition } from '../../types';

export const rdStationTechnologyDefinition = {
	id: "rd-station",
	name: "RD Station",
	website: "https://rdstation.com.br",
	description: "RD Station is a platform that helps medium and small businesses manage and automate their Digital Marketing strategy.",
	icon: "RD Station.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "rd-station:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("d335luupugsy2\\.cloudfront\\.net\\/js\\/loader-scripts\\/.*-loader\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rd-station:jsGlobal:1",
			kind: "jsGlobal",
			property: "RDStation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rd-station:jsGlobal:2",
			kind: "jsGlobal",
			property: "RDStationTrackingCodeChecker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
