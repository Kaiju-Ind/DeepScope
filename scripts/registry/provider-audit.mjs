/**
 * Find places where the registry conflates a hosting provider with a framework.
 *
 * A framework alone never proves where a site is hosted (self-hosted Next.js is
 * common), and a host alone never proves which framework built the site. This
 * audit reports:
 *
 *   - framework/library -> provider `implies`/`requires` edges;
 *   - provider -> framework/library `implies`/`requires` edges;
 *   - framework rules that match provider-owned signals (headers, hosts);
 *   - provider rules that match framework-default signals (`/_next/`, `__NEXT_DATA__`, ...).
 *
 * Usage: node scripts/registry/provider-audit.mjs [.wxt/registry-sources.mjs]
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const { technologies } = await import(pathToFileURL(resolve(process.argv[2] ?? '.wxt/registry-sources.mjs')).href);
const byId = new Map(technologies.map((technology) => [technology.id, technology]));

const PROVIDER_CATEGORIES = new Set(['infrastructure-hosting']);
const FRAMEWORK_CATEGORIES = new Set(['framework', 'ui-library', 'bundler', 'router', 'component-library', 'state-management', 'styling-library', 'transpiler']);
/** Hosting and platform providers that are not always filed under infrastructure-hosting. */
const PROVIDER_IDS = new Set([
	'vercel', 'netlify', 'cloudflare', 'cloudflare-pages', 'cloudflare-workers', 'aws-amplify', 'amazon-web-services', 'amazon-s3',
	'amazon-cloudfront', 'firebase', 'firebase-hosting', 'heroku', 'fly-io', 'render', 'github-pages', 'gitlab-pages', 'gatsby-cloud',
	'nuxthub', 'wix', 'squarespace', 'webflow', 'shopify', 'wordpress-com', 'wordpress-vip', 'wp-engine', 'kinsta', 'pantheon',
	'acquia-cloud-platform', 'supabase', 'expo', 'deno-deploy', 'azure', 'azure-static-web-apps', 'google-cloud', 'digitalocean',
	'railway', 'surge', 'hostinger', 'replit', 'glitch', 'bunny',
]);
const isProvider = (technology) => Boolean(technology && (PROVIDER_IDS.has(technology.id) || technology.categories.some((category) => PROVIDER_CATEGORIES.has(category))));
const isFramework = (technology) => Boolean(technology?.categories.some((category) => FRAMEWORK_CATEGORIES.has(category))) && !isProvider(technology);

/** Signals owned by hosting providers. */
const PROVIDER_SIGNAL = /vercel|netlify|\bcf-ray\b|cloudflare|amplify|firebase(?:app|hosting)|herokuapp|fly\.dev|onrender|github\.io|x-amz|x-nf-|x-now-/i;
/** Signals that frameworks emit by default wherever they are hosted. */
const FRAMEWORK_SIGNAL = /_next\/|__NEXT_DATA__|__next|_nuxt|__NUXT__|__sveltekit|_app\/immutable|___gatsby|__remixContext|__reactRouterContext|_astro\/|astro-island|_\$HY|_build\/assets/i;

function ruleText(rule) {
	return [rule.pattern, rule.valuePattern, rule.keyPattern, rule.hrefPattern].filter(Boolean).map((p) => p.source)
		.concat([rule.key, rule.property, rule.selector].filter(Boolean)).join(' ');
}

const report = { anyImpliesProvider: [], frameworkImpliesProvider: [], providerImpliesFramework: [], frameworkRulesOnProviderSignals: [], providerRulesOnFrameworkSignals: [] };
for (const technology of technologies) {
	for (const relation of ['implies', 'requires']) {
		for (const target of technology[relation] ?? []) {
			const other = byId.get(target);
			if (isProvider(other) && !isProvider(technology)) report.anyImpliesProvider.push(`${technology.id} [${technology.categories.join(',')}] ${relation} ${target}`);
			if (isFramework(technology) && isProvider(other)) report.frameworkImpliesProvider.push(`${technology.id} ${relation} ${target}`);
			if (isProvider(technology) && isFramework(other)) report.providerImpliesFramework.push(`${technology.id} ${relation} ${target}`);
		}
	}
	for (const rule of technology.rules) {
		const text = ruleText(rule);
		if (isFramework(technology) && PROVIDER_SIGNAL.test(text)) report.frameworkRulesOnProviderSignals.push(`${rule.id ?? technology.id} ${rule.kind} ${text.slice(0, 100)}`);
		if (isProvider(technology) && FRAMEWORK_SIGNAL.test(text)) report.providerRulesOnFrameworkSignals.push(`${rule.id ?? technology.id} ${rule.kind} ${text.slice(0, 100)}`);
	}
}

console.log(JSON.stringify({
	counts: Object.fromEntries(Object.entries(report).map(([key, list]) => [key, list.length])),
	...report,
}, null, '\t'));
