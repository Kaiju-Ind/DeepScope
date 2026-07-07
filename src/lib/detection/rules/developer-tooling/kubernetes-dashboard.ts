import type { TechnologyDefinition } from '../../types';

export const kubernetesDashboardTechnologyDefinition = {
	id: "kubernetes-dashboard",
	name: "Kubernetes Dashboard",
	website: "https://kubernetes.io/",
	icon: "Kubernetes.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "kubernetes-dashboard:dom:0",
			kind: "dom",
			selector: "[ng-app='kubernetesDashboard']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:kubernetes:kubernetes:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
