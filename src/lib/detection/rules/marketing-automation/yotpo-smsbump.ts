import type { TechnologyDefinition } from '../../types';

export const yotpoSmsbumpTechnologyDefinition = {
	id: "yotpo-smsbump",
	name: "Yotpo SMSBump",
	website: "https://www.yotpo.com/platform/smsbump-sms-marketing/",
	description: "SMS Bump is a SMS marketing and automations app which was acquired by Yotpo.",
	icon: "Yotpo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "yotpo-smsbump:jsGlobal:0",
			kind: "jsGlobal",
			property: "SMSBumpForm",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yotpo-smsbump:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\/smsbump_timer\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
