import type { TechnologyDefinition } from '../../types';

export const qualitelisTechnologyDefinition = {
	id: "qualitelis",
	name: "Qualitelis",
	website: "https://www.qualitelis.septeo.com",
	description: "Qualitelis is a hotel guest review system designed to collect, manage, and analyze feedback, helping hospitality providers improve services by addressing customer experiences and satisfaction levels.",
	icon: "Qualitelis.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "qualitelis:jsGlobal:0",
			kind: "jsGlobal",
			property: "InitWidgetQualitelis",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qualitelis:jsGlobal:1",
			kind: "jsGlobal",
			property: "resizeWidgetQualitelis",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qualitelis:jsGlobal:2",
			kind: "jsGlobal",
			property: "showHideWidgetQualitelis",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qualitelis:jsGlobal:3",
			kind: "jsGlobal",
			property: "widgetQualitelisFixed",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
