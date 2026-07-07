import type { TechnologyDefinition } from '../../types';

export const adobeExperiencePlatformIdentityServiceTechnologyDefinition = {
	id: "adobe-experience-platform-identity-service",
	name: "Adobe Experience Platform Identity Service",
	website: "https://docs.adobe.com/content/help/en/id-service/using/home.html",
	description: "Adobe Experience Platform Identity Service creates identity graphs that hold customer profiles and the known identifiers that belong to individual consumers.",
	icon: "Adobe.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "adobe-experience-platform-identity-service:jsGlobal:0",
			kind: "jsGlobal",
			property: "s_c_il.0._c",
			valuePattern: new RegExp("Visitor"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-experience-platform-identity-service:jsGlobal:1",
			kind: "jsGlobal",
			property: "s_c_il.1._c",
			valuePattern: new RegExp("Visitor"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-experience-platform-identity-service:jsGlobal:2",
			kind: "jsGlobal",
			property: "s_c_il.2._c",
			valuePattern: new RegExp("Visitor"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-experience-platform-identity-service:jsGlobal:3",
			kind: "jsGlobal",
			property: "s_c_il.3._c",
			valuePattern: new RegExp("Visitor"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-experience-platform-identity-service:jsGlobal:4",
			kind: "jsGlobal",
			property: "s_c_il.4._c",
			valuePattern: new RegExp("Visitor"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-experience-platform-identity-service:jsGlobal:5",
			kind: "jsGlobal",
			property: "s_c_il.5._c",
			valuePattern: new RegExp("Visitor"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
