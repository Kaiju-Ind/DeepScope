import type { TechnologyDefinition } from '../../types';

export const hclDigitalExperienceTechnologyDefinition = {
	id: "hcl-digital-experience",
	name: "HCL Digital Experience",
	website: "https://www.hcltechsw.com/dx",
	description: "HCL Digital Experience software empowers you to create, manage and deliver engaging omni-channel digital experiences to virtually all audiences.",
	icon: "hcl-dx.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hcl-digital-experience:url:0",
			kind: "url",
			pattern: new RegExp("\\/wps\\/wcm\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "hcl-digital-experience:jsGlobal:1",
			kind: "jsGlobal",
			property: "ibmCfg.themeConfig.modulesWebAppBaseURI",
			valuePattern: new RegExp("\\/wps\\/themeModules"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"high",
			"poa",
		],
		cpe: "cpe:2.3:a:ibm:websphere_portal:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
