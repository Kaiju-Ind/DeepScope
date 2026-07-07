import type { TechnologyDefinition } from '../../types';

export const megagroupCmsS3TechnologyDefinition = {
	id: "megagroup-cms-s3",
	name: "Megagroup CMS.S3",
	website: "https://megagroup.ru/cms",
	description: "Megagroup CMS.S3 management system is provided not as a “boxed product”, but as a separate service, that is, it works using SaaS technology. This means that you manage your site directly through your browser using an intuitive interface.",
	icon: "Megagroup.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "megagroup-cms-s3:jsGlobal:0",
			kind: "jsGlobal",
			property: "megacounter_key",
			description: "Page-owned global matches a known technology marker.",
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
