---
layout: post
title: "Threat hunting with Sigma rules — a practical guide"
date: 2026-04-05
tags: [threat-hunting, Sigma, SIEM]
excerpt: "Sigma is a generic signature format for SIEM systems. Here's how I use it to write detection rules that work across platforms without rewriting everything."
read_time: 6
---

Sigma is one of those tools that looks complex until you write your first rule — then you wonder how you worked without it.

## What Sigma is

Sigma is a generic, open standard for writing detection rules. You write one rule in YAML, then convert it to Splunk SPL, KQL, Elastic DSL — whatever your backend is. No more rewriting detections every time your SIEM changes.

## A basic rule

```yaml
title: Suspicious PowerShell Encoded Command
status: experimental
logsource:
    category: process_creation
    product: windows
detection:
    selection:
        CommandLine|contains: '-EncodedCommand'
    condition: selection
level: medium
tags:
    - attack.execution
    - attack.t1059.001
```

This flags any process creation where PowerShell is launched with an encoded command — a common obfuscation technique.

## Converting to Splunk

```bash
sigma convert -t splunk rules/my-rule.yml
```

Output: a complete SPL search ready to drop into a saved alert.

## What I've learned hunting with Sigma

Start with high-confidence, low-noise rules from the official repo before writing your own. Your environment will generate false positives for things you'd never expect — tune before you expand.

---

*Questions or corrections? Find me on GitHub.*
