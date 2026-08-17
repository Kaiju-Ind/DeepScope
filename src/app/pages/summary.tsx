import ArrowRightIcon from '~icons/fluent/arrow-right-24-regular';
import RefreshIcon from '~icons/fluent/arrow-clockwise-24-regular';
import { Link } from '@tanstack/solid-router';
import { For, Show } from 'solid-js';

import { AnalysisProgress } from '@/app/components/analysis-progress';
import { useSummary } from '@/app/context';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { ButtonLink } from '@/ui/router-link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Skeleton } from '@/ui/skeleton';

/** Default side-panel page that summarizes the current tab before deeper inspection. */
export function SummaryPage() {
	const summary = useSummary();
	const hostname = () => summary.analysis()?.hostname ?? summary.visibleTabIdentity()?.hostname;
	const groups = () => summary.groupedResults();
	const topResults = () => groups().flatMap((group) => group.results).slice(0, 5);
	const isInitialLoad = () => !summary.analysis() && summary.analysisActivity().busy;

	return (
		<>
			<header class="k-page-header">
				<div class="k-page-heading">
					<p class="k-page-eyebrow">Current tab</p>
					<h1 class="k-page-title">Summary</h1>
					<p class="k-page-description">
						{hostname() ?? 'Open an HTTP or HTTPS page to inspect it.'}
					</p>
				</div>
				<Button
					variant="outline"
					size="icon-sm"
					aria-label="Refresh site analysis"
					disabled={summary.busy()}
					onClick={() => void summary.refresh()}
				>
					<RefreshIcon />
				</Button>
			</header>

			<Show when={summary.analysisActivity().busy}>
				<AnalysisProgress activity={summary.analysisActivity()} />
			</Show>

			<Show when={summary.errorMessage()}>
				{(message) => (
					<Alert variant="destructive">
						<AlertTitle>Analysis failed</AlertTitle>
						<AlertDescription>{message()}</AlertDescription>
					</Alert>
				)}
			</Show>
			<Show when={summary.notice()}>
				{(notice) => (
					<Alert>
						<AlertTitle>{notice().variant === 'success' ? 'Analysis updated' : 'Analysis status'}</AlertTitle>
						<AlertDescription>{notice().text}</AlertDescription>
					</Alert>
				)}
			</Show>

			<div class="k-status-grid">
				<SummaryMetric label="Technologies" value={String(summary.resultCount())} loading={isInitialLoad()} />
				<SummaryMetric label="Categories" value={String(groups().length)} loading={isInitialLoad()} />
				<SummaryMetric label="Evidence" value={summary.evidenceCompletenessLabel()} loading={isInitialLoad()} />
				<SummaryMetric label="Observation" value={summary.liveUpdateChipLabel()} loading={isInitialLoad()} />
			</div>

			<Show
				when={summary.analysis()}
				fallback={summary.analysisActivity().busy ? <SummarySkeleton /> : <NoAnalysis />}
			>
				{(analysis) => (
					<Show
						when={analysis().results.length > 0}
						fallback={(
							<Empty class="panel-section min-h-40 p-6">
								<EmptyHeader>
									<EmptyTitle>No technologies detected</EmptyTitle>
									<EmptyDescription>The current evidence does not match a registry technology yet.</EmptyDescription>
								</EmptyHeader>
							</Empty>
						)}
					>
						<Card size="sm">
							<CardHeader class="flex-row items-start justify-between gap-3">
								<div>
									<CardTitle>Key findings</CardTitle>
									<CardDescription>The strongest current technology findings for this page.</CardDescription>
								</div>
								<Badge variant="outline">{analysis().source}</Badge>
							</CardHeader>
							<CardContent class="grid gap-2">
								<For each={topResults()}>
									{(result) => (
										<Link
											to="/technology/$technologyId"
											params={{ technologyId: result.technologyId }}
											class="k-tech-row"
										>
											<div class="k-tech-icon" aria-hidden="true">{result.name.slice(0, 1).toUpperCase()}</div>
											<div class="min-w-0 flex-1">
												<p class="k-tech-title">{result.name}</p>
												<div class="k-tech-meta">
													<Show when={result.version}><span>v{result.version}</span></Show>
													<span>{result.evidence.length} {result.evidence.length === 1 ? 'signal' : 'signals'}</span>
													<span>{result.confidence.level}</span>
												</div>
											</div>
										</Link>
									)}
								</For>
								<ButtonLink to="/technologies" variant="ghost" class="mt-1 w-full justify-between">
									View all technologies
									<ArrowRightIcon />
								</ButtonLink>
							</CardContent>
						</Card>

						<Card size="sm">
							<CardHeader>
								<CardTitle>Finding groups</CardTitle>
								<CardDescription>How the current detections are distributed across technology categories.</CardDescription>
							</CardHeader>
							<CardContent class="grid gap-2">
								<For each={groups().slice(0, 8)}>
									{(group) => (
										<div class="flex items-center justify-between gap-3 rounded-lg border border-white/8 bg-white/[0.025] px-3 py-2.5">
											<span class="text-xs text-white/62">{group.label}</span>
											<span class="font-mono text-[0.6875rem] text-white/42">{group.results.length}</span>
										</div>
									)}
								</For>
							</CardContent>
						</Card>
					</Show>
				)}
			</Show>

			<Card size="sm">
				<CardHeader>
					<CardTitle>Scan details</CardTitle>
					<CardDescription>Open the operational view for observation state, matcher state, and replay receipts.</CardDescription>
				</CardHeader>
				<CardContent>
					<ButtonLink to="/scans" variant="outline" class="w-full justify-between">
						Open scans
						<ArrowRightIcon />
					</ButtonLink>
				</CardContent>
			</Card>
		</>
	);
}

function SummaryMetric(props: { readonly label: string; readonly value: string; readonly loading: boolean }) {
	return (
		<div class="k-status-card">
			<p class="k-status-label">{props.label}</p>
			<Show
				when={!props.loading}
				fallback={<Skeleton class="mt-1 h-5 w-16" aria-label={`Loading ${props.label.toLowerCase()}`} />}
			>
				<p class="k-status-value break-words text-sm">{props.value}</p>
			</Show>
		</div>
	);
}

function SummarySkeleton() {
	return (
		<Card size="sm" aria-label="Loading site findings">
			<CardHeader>
				<Skeleton class="h-4 w-28" />
				<Skeleton class="h-3 w-56 max-w-full" />
			</CardHeader>
			<CardContent class="grid gap-2">
				<For each={[0, 1, 2]}>{() => <Skeleton class="h-16 w-full rounded-xl" />}</For>
			</CardContent>
		</Card>
	);
}

function NoAnalysis() {
	return (
		<Empty class="panel-section min-h-40 p-6">
			<EmptyHeader>
				<EmptyTitle>No site analysis yet</EmptyTitle>
				<EmptyDescription>Kaiju scans the active page when this panel opens or when you press Refresh.</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
