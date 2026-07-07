import type { TechnologyDefinition } from '../../types';

export const decapCmsTechnologyDefinition = {
	id: "decap-cms",
	name: "Decap CMS",
	website: "https://decapcms.org",
	description: "Decap CMS is an open-source content management system designed to integrate with Git workflows.",
	icon: "DecapCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "decap-cms:jsGlobal:0",
			kind: "jsGlobal",
			property: "DecapCms.getBackend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "decap-cms:jsGlobal:1",
			kind: "jsGlobal",
			property: "DecapCmsApp.getBackend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "decap-cms:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpackChunkdecap_website",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:techhub.p-m:decap_cms:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
