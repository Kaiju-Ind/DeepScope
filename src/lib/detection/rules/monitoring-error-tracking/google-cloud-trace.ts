import type { TechnologyDefinition } from '../../types';

export const googleCloudTraceTechnologyDefinition = {
	id: "google-cloud-trace",
	name: "Google Cloud Trace",
	website: "https://cloud.google.com/trace",
	description: "Google Cloud Trace is a distributed tracing system that collects latency data from applications and displays it in the Google Cloud Console.",
	icon: "google-cloud-trace.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [],
	implies: [
		"google-cloud",
	],
} as const satisfies TechnologyDefinition;
