import ChevronLeft from '~icons/fluent/chevron-left-24-regular';
import { useParams } from '@tanstack/solid-router';
import { For, Show } from 'solid-js';

import { formatEvidencePreview } from "../evidence.ts";
import { createEvidencePreview } from "../model/explanations.ts";
import { useTechnology } from "../panel/context.ts";
import { Badge } from "../../ui/badge.tsx";
import { ButtonLink } from "../../ui/router-link.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card.tsx";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "../../ui/empty.tsx";

/** Full evidence and explanation view for one technology on the active tab. */
export function TechnologyPage() {
	const params = useParams({ strict: false });
	const panel = useTechnology();
	/** Normalize the route parameter to the registry identity used for result and explanation lookup. */
	const technologyId = () => String(params().technologyId ?? '');
	/** Select the current analysis result for the route's technology, returning nothing if the analysis lacks it. */
	const result = () => panel.analysis()?.results.find((item) => item.technologyId === technologyId());
	/** Read the provider's explanation for the current technology without starting a separate analysis. */
	const explanation = () => panel.explanationsByTechnologyId()[technologyId()];
	/** Prefer prepared explanation evidence and fall back to previews from the raw result when no explanation evidence exists. */
	const evidence = () => explanation()?.evidence.length
		? explanation()!.evidence
		: result()?.evidence.map(createEvidencePreview) ?? [];

	return (
		<>
			<header class="k-page-header">
				<div class="k-page-heading">
					<ButtonLink to="/technologies" variant="ghost" size="sm" class="k-detail-back">
						<ChevronLeft /> Technologies
					</ButtonLink>
					<Show when={result()}>
						{(value) => (
							<>
								<h1 class="k-page-title mt-2">{value().name}</h1>
								<p class="k-page-description">{value().description ?? 'Detected technology evidence and confidence.'}</p>
							</>
						)}
					</Show>
				</div>
			</header>

			<Show
				when={result()}
				fallback={(
					<Empty class="panel-section min-h-48 p-6">
						<EmptyHeader>
							<EmptyTitle>Technology is not in the current result</EmptyTitle>
							<EmptyDescription>The active tab or detector snapshot changed after this page was opened.</EmptyDescription>
						</EmptyHeader>
					</Empty>
				)}
			>
				{(value) => (
					<>
						<div class="flex flex-wrap gap-2">
							<For each={value().categories}>{(category) => <Badge variant="outline">{category}</Badge>}</For>
							<Badge>{value().confidence.level} · {value().confidence.value}%</Badge>
							<Show when={value().version}>{(version) => <Badge variant="secondary">v{version()}</Badge>}</Show>
							<Show when={value().inferred}><Badge variant="secondary">Inferred</Badge></Show>
						</div>

						<Show when={explanation()}>
							{(details) => (
								<Card size="sm">
									<CardHeader>
										<CardTitle>Why Kaiju detected it</CardTitle>
										<CardDescription>{details().headline}</CardDescription>
									</CardHeader>
									<CardContent>
										<ul class="grid list-disc gap-1.5 pl-5 text-xs leading-5 text-white/58">
											<For each={details().reasons}>{(reason) => <li>{reason}</li>}</For>
										</ul>
									</CardContent>
								</Card>
							)}
						</Show>

						<Card size="sm">
							<CardHeader>
								<CardTitle>Evidence</CardTitle>
								<CardDescription>{evidence().length} public signal{evidence().length === 1 ? '' : 's'} support this result.</CardDescription>
							</CardHeader>
							<CardContent>
								<ol class="grid gap-2">
									<For each={evidence()}>
										{(item, index) => (
											<li class="rounded-lg border border-white/8 bg-white/[0.025] p-3 text-xs leading-5 text-white/58">
												<span class="mr-2 font-mono text-[0.625rem] text-white/28">{index() + 1}</span>
												{formatEvidencePreview(item)}
											</li>
										)}
									</For>
								</ol>
							</CardContent>
						</Card>

						<Show when={value().warnings?.length}>
							<Card size="sm">
								<CardHeader><CardTitle>Warnings</CardTitle></CardHeader>
								<CardContent>
									<ul class="grid list-disc gap-1.5 pl-5 text-xs leading-5 text-white/58">
										<For each={value().warnings}>{(warning) => <li>{warning}</li>}</For>
									</ul>
								</CardContent>
							</Card>
						</Show>
					</>
				)}
			</Show>
		</>
	);
}
