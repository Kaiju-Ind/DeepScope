import type { TechnologyDefinition } from '../../types';

export const parkingcrewTechnologyDefinition = {
	id: "parkingcrew",
	name: "ParkingCrew",
	website: "https://www.parkingcrew.com",
	description: "ParkingCrew is a direct navigation monetisation provider.",
	icon: "ParkingCrew.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "parkingcrew:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("var\\slink\\s=\\s'www\\.parkingcrew\\.net'"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "parkingcrew:jsGlobal:1",
			kind: "jsGlobal",
			property: "pcrewAdloaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
