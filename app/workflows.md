---
title: Workflows
description: Build reusable Ogma workflows for passive processing, active actions, and data conversion.
keywords: Ogma Workflows, workflow automation, web security workflows
---

# Workflows

Workflows are reusable automation pipelines that process captured traffic, run active steps, or transform data - without requiring you to write standalone scripts.

## Workflow Types

| Type | Triggered by | Common use |
|------|-------------|------------|
| Passive | New captured traffic | Flag interesting patterns, tag requests, create findings automatically. |
| Active | Manual run | Send follow-up requests, chain actions, execute multi-step tests. |

Passive workflows run continuously in the background. Active workflows run on demand against a selected set of requests.

## The Workflow Canvas

Open **Workflows** and select a workflow to open its canvas.

- Nodes appear in the center panel. Each node has typed input and output ports.
- Connect an output port to an input port by clicking and dragging between them.
- Click a node to open its configuration panel on the right.
- The toolbar at the top contains the run, enable/disable, and import/export controls.

## Node Types

| Node | Description |
|------|-------------|
| HTTP condition | Evaluates a HTTPQL expression against the current request/response. Routes traffic to the true or false output accordingly. |
| Finding creator | Creates a finding on the current request with a configurable title, severity, and description. |
| Request sender | Sends a new HTTP request, optionally using variables from earlier nodes. |
| Variable extractor | Extracts a value from the current request or response using a regex or JSON path and stores it as a named variable. |
| Script runner | Executes a JavaScript snippet, receives the current request/response as input, and passes a result downstream. |

## Importing a Workflow

1. Click **Import** in the Workflows toolbar.
2. Select a JSON workflow file.
3. The workflow opens in the canvas. Verify the node configuration before enabling it.
4. Save the workflow.

Exported workflow JSON files can be shared between Ogma installations or stored in version control.

## Running a Workflow on Captured History

Active workflows can be re-run against previously captured requests.

1. Open the workflow.
2. Click **Run on history**.
3. In the scan history modal, enter an optional HTTPQL filter to limit which requests the workflow processes.
4. Click **Run**.

The workflow processes matching requests sequentially. Progress and errors appear in the run log.

The **AI Assist** button next to the scan history filter input generates a HTTPQL expression from a plain-language description.

## Workflow Runs and Results

Each execution appears as a row in the **Runs** panel below the canvas.

- Click a run to see per-node step output.
- Nodes that produced errors are highlighted.
- Findings created during the run appear in the [Findings](./findings.md) view.
- Variables extracted during the run are visible in the step detail panel.

## Enabling a Passive Workflow

1. Open the workflow.
2. Verify the canvas configuration is complete (no disconnected required ports).
3. Toggle **Enable** in the toolbar.

Enabled passive workflows process new traffic automatically. Disable a workflow to pause it without deleting it.

## Related Pages

- [Findings](./findings.md)
- [Environment](./environment.md)
- [HTTPQL and StreamQL](../reference/httpql.md)
