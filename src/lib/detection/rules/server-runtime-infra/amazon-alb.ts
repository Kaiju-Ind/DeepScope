import type { TechnologyDefinition } from '../../types';

export const amazonAlbTechnologyDefinition = {
	id: "amazon-alb",
	name: "Amazon ALB",
	website: "https://aws.amazon.com/elasticloadbalancing/",
	description: "Amazon Application Load Balancer (ALB) distributes incoming application traffic to increase availability and support content-based routing.",
	icon: "Amazon ELB.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "amazon-alb:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^AWSALB$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "amazon-alb:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^AWSALBCORS$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "amazon-alb:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^awsalb$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "amazon-alb:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^awsalbcors$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	implies: [
		"amazon-web-services",
	],
} as const satisfies TechnologyDefinition;
