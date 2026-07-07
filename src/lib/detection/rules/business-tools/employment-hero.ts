import type { TechnologyDefinition } from '../../types';

export const employmentHeroTechnologyDefinition = {
	id: "employment-hero",
	name: "Employment Hero",
	website: "https://employmenthero.com",
	description: "Employment Hero is a cloud-based human resources information system (HRIS) designed to manage HR operations, payroll processing, and recruitment workflows for small and medium-sized businesses.",
	icon: "EmploymentHero.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "employment-hero:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("employmenthero\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "employment-hero:jsGlobal:1",
			kind: "jsGlobal",
			property: "emhTheme.siteSlug",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "employment-hero:jsGlobal:2",
			kind: "jsGlobal",
			property: "emhTracking.token",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
