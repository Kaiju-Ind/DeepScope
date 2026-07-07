import type { TechnologyDefinition } from '../../types';

export const clusterCisTechnologyDefinition = {
	id: "cluster-cis",
	name: "Cluster CIS",
	website: "https://cluster.gr",
	description: "Cluster CIS is a provider of business automation solutions, including WooCommerce ERP, CRM, WMS, SFA, alongside website development and e-shop construction services.",
	icon: "ClusterCIS.svg",
	categories: [
		"platform-cms-builder",
		"business-tools",
	],
	rules: [
		{
			id: "cluster-cis:dom:0",
			kind: "dom",
			selector: "link[href*='wp-content/plugins/cluster-gtm']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
