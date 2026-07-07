import type { TechnologyDefinition } from '../../types';

export const acquiaCloudPlatformTechnologyDefinition = {
	id: "acquia-cloud-platform",
	name: "Acquia Cloud Platform",
	website: "https://www.acquia.com/products/drupal-cloud/cloud-platform",
	description: "Acquia Cloud Platform is a Drupal-tuned application lifecycle management suite with an infrastructure to support Drupal deployment workflow processes.",
	icon: "acquia-cloud.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "acquia-cloud-platform:header:0",
			kind: "header",
			key: "X-AH-Environment",
			valuePattern: new RegExp("^(next)?.*$", "i"),
			version: {
				source: "match",
				template: "$1?Next:",
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "acquia-cloud-platform:header:1",
			kind: "header",
			key: "x-ah-environment",
			valuePattern: new RegExp("^(next)?.*$", "i"),
			version: {
				source: "match",
				template: "$1?next:",
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"amazon-web-services",
	],
} as const satisfies TechnologyDefinition;
