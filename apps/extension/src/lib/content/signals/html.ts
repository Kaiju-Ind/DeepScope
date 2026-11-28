import type { HtmlProbe } from "@deepscope/detection/collection/input";
import { SOURCE_LIMITS } from "@deepscope/detection/limits";
import { truncate } from "@deepscope/detection/normalizers";
import type { HtmlMatchSignal } from "@deepscope/detection/types";
import * as dictionary from "@deepscope/detection/observations/dictionary";

/** Reserve three quarters of the HTML budget for the prefix and the remainder for rule-driven matches later in the document. */
export function boundedHtml(html: string, htmlProbeList: HtmlProbe[]): string {
	if (html.length <= SOURCE_LIMITS.htmlChars) {
		return html;
	}

	const baseLimit = Math.floor(SOURCE_LIMITS.htmlChars * 0.75);
	const snippetBudget = SOURCE_LIMITS.htmlChars - baseLimit;
	const base = html.slice(0, baseLimit);
	const snippets = collectRuleDrivenHtmlSnippets(html, htmlProbeList, {
		maxChars: snippetBudget,
		skipBeforeIndex: baseLimit,
	});

	const combined = snippets ? `${base}\n${snippets}` : base;
	return truncate(combined, SOURCE_LIMITS.htmlChars);
}

/** Retain unique bounded contexts around later rule matches while honoring the remaining HTML character budget. */
function collectRuleDrivenHtmlSnippets(
	html: string,
	probes: HtmlProbe[],
	options: {
		maxChars: number;
		skipBeforeIndex: number;
	},
): string {
	const snippets: string[] = [];
	const seenRanges = new Set<string>();
	let usedChars = 0;

	for (const probe of probes) {
		const pattern = safeProbePattern(probe);
		if (!pattern) {
			continue;
		}

		const match = findMatchAtOrAfter(pattern, html, options.skipBeforeIndex);
		if (!match) {
			continue;
		}

		const matchLength = Math.max(1, Math.min(match.value.length, 2_000));
		const start = Math.max(0, match.index - 500);
		const end = Math.min(html.length, match.index + matchLength + 500);
		const rangeKey = `${start}:${end}`;

		if (seenRanges.has(rangeKey)) {
			continue;
		}

		const snippet = html.slice(start, end);
		if (usedChars + snippet.length > options.maxChars) {
			continue;
		}

		seenRanges.add(rangeKey);
		snippets.push(snippet);
		usedChars += snippet.length;
	}

	return snippets.join('\n');
}

/** Find the first match at the requested source offset and advance empty matches so scanning cannot stall. */
function findMatchAtOrAfter(
	pattern: RegExp,
	html: string,
	minIndex: number,
): { index: number; value: string } | null {
	pattern.lastIndex = minIndex;

	for (let match = pattern.exec(html); match; match = pattern.exec(html)) {
		if (match.index >= minIndex) {
			return { index: match.index, value: match[0] ?? '' };
		}

		if (match[0] === '') {
			pattern.lastIndex += 1;
		}
	}

	return null;
}

/** Create a fresh global scanner without sticky/indices flags and skip invalid authored patterns. */
function safeProbePattern(probe: HtmlProbe): RegExp | null {
	try {
		const flags = Array.from(new Set(`${probe.flags.replace(/[dy]/g, '')}g`)).join('');
		return new RegExp(probe.source, flags);
	} catch {
		return null;
	}
}

/** Retain the first bounded match and captures per exact technology/rule identity without shipping the full HTML. */
export function collectHtmlProbeMatches(
	html: string,
	probes: HtmlProbe[],
): Record<string, HtmlMatchSignal> {
	const matches = dictionary.create<HtmlMatchSignal>();

	for (const probe of probes) {
		const pattern = safeProbePattern(probe);
		if (!pattern) {
			continue;
		}

		pattern.lastIndex = 0;
		const match = pattern.exec(html);
		if (!match) {
			continue;
		}

		matches[htmlProbeKey(probe.technologyId, probe.ruleIndex)] = {
			matchedValue: truncate(match[0] ?? '', SOURCE_LIMITS.evidenceValueChars),
			captures: match.slice(1).map((value) =>
				truncate(value ?? '', SOURCE_LIMITS.evidenceValueChars),
			),
		};
	}

	return matches;
}

/** Match the technology/rule identity expected by the portable observation matcher. */
function htmlProbeKey(technologyId: string, ruleIndex: number): string {
	return `${technologyId}:${ruleIndex}`;
}
