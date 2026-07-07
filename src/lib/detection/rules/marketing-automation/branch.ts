import type { TechnologyDefinition } from '../../types';

export const branchTechnologyDefinition = {
	id: "branch",
	name: "Branch",
	website: "https://branch.io",
	description: "Branch is a mobile deep linking system to increase engagement and retention.",
	icon: "Branch.png",
	categories: [
		"marketing-automation",
		"analytics",
	],
	rules: [
		{
			id: "branch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.branch\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "branch:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.link\\/_r\\?sdk=web([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "branch:jsGlobal:2",
			kind: "jsGlobal",
			property: "branch.setBranchViewData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "branch:jsGlobal:3",
			kind: "jsGlobal",
			property: "branch_callback__0",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
