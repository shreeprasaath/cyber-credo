---
layout: post
title: "Building a SOC home lab with Splunk and ELK"
date: 2026-04-11
tags: [home-lab, SIEM, blue-team]
excerpt: "A step-by-step walkthrough of the detection lab I built at home — simulated attack traffic, Sigma rules, and alerting pipelines that actually fire."
read_time: 8
---

Building a detection lab at home is the single best thing I did for my blue team career. Here's how mine is set up and why each component matters.

## Why a home lab

Reading about SIEM is not the same as tuning one. You don't understand alert fatigue until you've spent three hours chasing a false positive you created yourself.

## The stack

- **Splunk Free** — 500MB/day ingest limit is enough for a lab
- **ELK** (Elasticsearch, Logstash, Kibana) — side-by-side with Splunk for comparison
- **Sysmon** — on every Windows VM, feeding detailed process events
- **Atomic Red Team** — for controlled attack simulation

## Network layout

All VMs run on a dedicated VLAN inside pfSense. Attack traffic never touches my home network. The SIEM sits on its own box (a repurposed mini PC) collecting logs from everything else.

## What I learned

Sigma rules are far more useful than vendor-default content. Writing your own rules for specific ATT&CK techniques forces you to understand exactly what telemetry you need — and reveals how much you're missing.

---

*Next post: tuning Sigma rules to reduce false positives by 60%.*
