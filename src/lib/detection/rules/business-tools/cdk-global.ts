import type { TechnologyDefinition } from '../../types';

export const cdkGlobalTechnologyDefinition = {
	id: "cdk-global",
	name: "CDK Global",
	website: "https://www.cdkglobal.com",
	description: "CDK Global offered a range of software and digital marketing solutions designed to help automotive businesses manage their operations, improve customer engagement, and enhance their online presence. Their services included dealership management systems (DMS), customer relationship management (CRM) software, website and digital marketing services, and various other tools tailored to the automotive industry.",
	icon: "CDK Global.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "cdk-global:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.connectcdk\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
