import type { TechnologyDefinition } from '../../types';

export const clickfunnelsTechnologyDefinition = {
	id: "clickfunnels",
	name: "ClickFunnels",
	website: "https://www.clickfunnels.com",
	description: "ClickFunnels is an online sales funnel builder that helps businesses market, sell, and deliver their products online.",
	icon: "ClickFunnels.svg",
	categories: [
		"marketing-automation",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "clickfunnels:jsGlobal:0",
			kind: "jsGlobal",
			property: "CFAppDomain",
			valuePattern: new RegExp("app\\.clickfunnels\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clickfunnels:jsGlobal:1",
			kind: "jsGlobal",
			property: "CFSurveyParticipantID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clickfunnels:jsGlobal:2",
			kind: "jsGlobal",
			property: "ClickFunnels",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clickfunnels:jsGlobal:3",
			kind: "jsGlobal",
			property: "cfAddPolyfill",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clickfunnels:meta:4",
			kind: "meta",
			key: "cf:app_domain:",
			valuePattern: new RegExp("app\\.clickfunnels\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
