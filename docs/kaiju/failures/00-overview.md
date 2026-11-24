# Overview

Use this catalogue to identify the failing contract, preserve the evidence and choose the smallest repair. The entries
come from DeepScope's own history (`DS-*` identifiers). They include observed failures, build defects, verification
limits and recorded design risks. Each entry records the confidence in its cause separately from its repair status. A
merged fix, a passing test, a green workflow and a completed journey in a real browser are different evidence.

Crawl's catalogue held 46 deployment entries from ItsAPlan and OpenATS (Kubernetes, Bunny, Tailscale, email, object
storage) and a retrospective coverage map. None of them concern a browser extension, so they were not copied; they
remain in Kaiju-Ind/Crawl `docs/kaiju/failures/` at `a00f0036d`. The method files (finding the first cause, starting
from the symptom, adding the next incident) were kept. Use [AE01–AE08](../agents/README.md) for the recurring
execution controls.
