---
title: MCP Resources and Tools
description: Full reference for Ogma MCP resources, resource templates, and tools exposed by the ogma-mcp server.
keywords: Ogma MCP tools, Ogma MCP resources, MCP endpoints, Codex Ogma integration, Claude Code Ogma MCP
---

# MCP Resources and Tools

The Ogma MCP server is for external MCP clients such as Codex, Claude Code, Cursor, and other Model Context Protocol hosts. It is separate from the in-app AI assistant.

MCP exposes three surfaces:

- **Resources**: named read targets that an MCP client can open.
- **Resource templates**: parameterized read targets for a specific entry, finding, workflow, run, export, or Replay object.
- **Tools**: callable actions. Some are read-only. Some require server startup flags.

For startup flags and client configuration, see [MCP setup](../mcp-setup.md).

## Resources

| Resource | What it returns |
| --- | --- |
| `ogma://status` | Current backend health and status. |
| `ogma://projects` | All Ogma projects. |
| `ogma://project/current` | Current active project. |
| `ogma://instances` | Proxy listener instances. |
| `ogma://http-history/recent` | 20 most recent HTTP entries without body content. |
| `ogma://ws-history/recent` | 20 most recent WebSocket connections. |
| `ogma://findings` | Up to 50 findings. |
| `ogma://workflows` | Configured workflows. |
| `ogma://workflow-runs/recent` | 20 most recent workflow run records. |
| `ogma://migration/workflows` | Workflow migration compatibility report. |
| `ogma://exports/recent` | 10 most recent export jobs. |
| `ogma://capabilities` | MCP server capability summary. |
| `ogma://mcp/permissions` | Current MCP permission flags. |
| `ogma://replay/sessions/recent` | 20 most recent Replay sessions. |

## Resource Templates

| Template | What it returns |
| --- | --- |
| `ogma://http-history/{entry_id}` | One HTTP history entry. |
| `ogma://ws-history/{connection_id}` | One WebSocket connection. |
| `ogma://findings/{finding_id}` | One finding. |
| `ogma://workflows/{workflow_id}` | One workflow. |
| `ogma://workflow-runs/{run_id}` | One workflow run. |
| `ogma://exports/{export_id}` | One export job. |
| `ogma://replay/sessions/{session_id}` | One Replay session. |
| `ogma://replay/attempts/{session_id}/{attempt_id}` | One Replay attempt. |
| `ogma://workflow-safety/{workflow_id}` | Workflow safety classification and required permissions. |

## Tool Permissions

Most inspection tools are always available. Mutating or outbound actions are controlled by `ogma-mcp` startup flags:

| Permission flag | Enables |
| --- | --- |
| `--allow-write-findings` | Finding create, update, tag, link, and delete actions. |
| `--allow-export-data` | Export job creation and export download metadata. |
| `--allow-send-requests` | Replay send, raw HTTP request, bulk request, login test, fetch URL, and request repetition tools. |
| `--allow-run-workflows` | Workflow and Automate execution tools. |
| `--allow-intercept-control` | Intercept queue mutation and intercept state control. |

## Tool Catalog

### HTTP History and Querying

| Tool | What it does |
| --- | --- |
| `ogma_search_http_history` | Searches HTTP history with HTTPQL and returns request/response metadata. |
| `ogma_get_http_entry` | Gets one HTTP entry by ID, optionally with body previews. |
| `ogma_get_http_entry_body` | Gets full request and/or response body for an HTTP entry. |
| `ogma_validate_httpql` | Validates an HTTPQL expression. |
| `ogma_analyze_http_entry_security` | Reviews one HTTP entry for security-relevant behavior and evidence. |
| `ogma_search_by_vulnerability_pattern` | Searches captured traffic for vulnerability-oriented patterns. |

### WebSocket and SSE

| Tool | What it does |
| --- | --- |
| `ogma_search_ws_history` | Searches WebSocket connection history with StreamQL. |
| `ogma_get_ws_messages` | Gets stored messages for one WebSocket connection. |
| `ogma_validate_streamql` | Validates a StreamQL expression. |
| `ogma_get_ws_messages_live` | Gets live WebSocket messages captured from browser instrumentation. |
| `ogma_create_ws_replay_session` | Creates a WebSocket Replay session. |
| `ogma_connect_ws_replay` | Connects a WebSocket Replay session. |
| `ogma_send_ws_replay_message` | Sends a message through a WebSocket Replay session. |
| `ogma_list_ws_replay_sessions` | Lists WebSocket Replay sessions. |
| `ogma_browser_get_ws_frames` | Reads WebSocket frames captured by the embedded browser. |
| `ogma_browser_start_ws_capture` | Starts browser-side WebSocket frame capture. |
| `ogma_browser_send_ws_message` | Sends a WebSocket message from browser context. |

### Findings and Evidence

| Tool | What it does |
| --- | --- |
| `ogma_search_findings` | Searches findings by severity, reporter, text, limit, and offset. |
| `ogma_get_finding` | Gets one finding by ID. |
| `ogma_preview_finding_from_evidence` | Previews a finding draft from an HTTP entry without creating it. |
| `ogma_create_finding` | Creates a finding with metadata, tags, confidence, remediation, and optional evidence links. |
| `ogma_update_finding` | Updates an existing finding. |
| `ogma_add_finding_tag` | Adds tags to a finding without replacing existing tags. |
| `ogma_link_finding_evidence` | Links HTTP, Replay, Automate, or WebSocket evidence to a finding. |
| `ogma_delete_finding` | Deletes a finding. |
| `ogma_create_world_class_finding` | Creates a detailed finding with structured evidence, PoC, remediation, and vulnerability type. |
| `ogma_get_finding_evidence_summary` | Summarizes linked evidence for a finding. |
| `ogma_export_findings_report` | Creates a findings report export. |

### Exports

| Tool | What it does |
| --- | --- |
| `ogma_preview_export_plan` | Previews export contents and format without creating a job. |
| `ogma_create_export_job` | Creates an export job for history, search results, findings, or Automate results. |
| `ogma_get_export_job` | Gets one export job by ID. |
| `ogma_list_export_jobs` | Lists export jobs. |
| `ogma_get_export_download_info` | Gets download metadata for a completed export. |

### Replay and Request Sending

| Tool | What it does |
| --- | --- |
| `ogma_preview_replay_send` | Previews a Replay send and returns a confirmation token. |
| `ogma_send_replay_request` | Sends a Replay request with the confirmation token. |
| `ogma_create_replay_session_from_history` | Creates a Replay session from a captured HTTP entry. |
| `ogma_create_replay_session_raw` | Creates a Replay session from a raw request definition. |
| `ogma_get_replay_session` | Gets Replay session metadata. |
| `ogma_get_replay_attempt` | Gets one Replay attempt. |
| `ogma_list_replay_sessions` | Lists Replay sessions. |
| `ogma_repeat_request` | Repeats an existing request with optional changes. |
| `ogma_http_request` | Sends a direct HTTP request through the MCP tool surface. |
| `ogma_bulk_send_requests` | Sends a batch of requests. |
| `ogma_fetch_url` | Fetches a URL and returns response status, headers, and body preview. |
| `ogma_test_login` | Tests a login endpoint with supplied or default credential pairs and reports evidence. |

### Workflows and Automate

| Tool | What it does |
| --- | --- |
| `ogma_search_workflows` | Lists and filters workflows. |
| `ogma_get_workflow` | Gets one workflow by ID. |
| `ogma_get_workflow_run` | Gets one workflow run record. |
| `ogma_validate_workflow_import` | Validates a workflow bundle for import compatibility. |
| `ogma_get_workflow_safety` | Gets safety and permission classification for a workflow. |
| `ogma_preview_workflow_run` | Previews a workflow run before execution. |
| `ogma_run_workflow` | Runs a workflow. |
| `ogma_cancel_workflow_run` | Cancels a workflow run. |
| `ogma_list_automate_sessions` | Lists Automate sessions. |
| `ogma_get_automate_session` | Gets one Automate session. |
| `ogma_create_automate_session` | Creates an Automate session. |
| `ogma_run_automate_session` | Runs an Automate session. |
| `ogma_list_automate_runs` | Lists Automate runs. |
| `ogma_get_automate_run` | Gets one Automate run. |
| `ogma_cancel_automate_run` | Cancels an Automate run. |
| `ogma_list_automate_results` | Lists Automate results. |
| `ogma_get_automate_result` | Gets one Automate result. |
| `ogma_load_skill` | Loads built-in MCP skill guidance into the assistant context. |

### Scanner

| Tool | What it does |
| --- | --- |
| `ogma_run_passive_scan` | Runs passive scanner checks for one HTTP entry. |
| `ogma_run_passive_scan_all` | Runs passive scanner checks across captured history. |
| `ogma_list_scanner_rules` | Lists scanner detection rules. |

### Intercept

| Tool | What it does |
| --- | --- |
| `ogma_get_intercept_status` | Gets current intercept state. |
| `ogma_set_intercept_enabled` | Enables or disables intercept. |
| `ogma_list_intercept_queue` | Lists queued intercepted items. |
| `ogma_get_intercept_item` | Gets one queued intercept item. |
| `ogma_forward_intercept_item` | Forwards an intercepted item, optionally modified. |
| `ogma_drop_intercept_item` | Drops an intercepted item. |

### Proxy, Scope, and Network

| Tool | What it does |
| --- | --- |
| `ogma_list_proxy_listeners` | Lists proxy listeners. |
| `ogma_start_proxy_listener` | Starts a proxy listener. |
| `ogma_stop_proxy_listener` | Stops a proxy listener. |
| `ogma_list_scope_presets` | Lists scope presets. |
| `ogma_get_active_scope` | Gets the active scope. |
| `ogma_set_active_scope` | Sets the active scope. |
| `ogma_local_ips` | Lists local IP addresses useful for listeners and callbacks. |
| `ogma_get_tls_info` | Gets TLS information for a target or captured connection. |

### Sitemap, Endpoints, and OAST

| Tool | What it does |
| --- | --- |
| `ogma_get_sitemap` | Gets the captured sitemap. |
| `ogma_get_sitemap_parameters` | Gets parameters discovered for sitemap entries. |
| `ogma_list_extracted_endpoints` | Lists endpoints extracted from traffic and frontend content. |
| `ogma_import_openapi_spec` | Imports an OpenAPI specification to seed endpoints and request shapes. |
| `ogma_get_oast_config` | Gets OAST listener configuration. |
| `ogma_list_oast_interactions` | Lists OAST interactions. |

### History Annotation

| Tool | What it does |
| --- | --- |
| `ogma_set_entry_color` | Sets the color label for a history entry. |
| `ogma_add_entry_tag` | Adds a tag to a history entry. |
| `ogma_remove_entry_tag` | Removes a tag from a history entry. |

### Browser Control

| Tool | What it does |
| --- | --- |
| `ogma_browser_launch` | Launches the Ogma browser. |
| `ogma_browser_navigate` | Navigates the browser to a URL. |
| `ogma_browser_screenshot` | Captures browser page state. |
| `ogma_browser_execute_js` | Executes JavaScript in the browser. |
| `ogma_browser_get_source` | Gets the current page DOM source. |
| `ogma_browser_get_cookies` | Gets browser cookies. |
| `ogma_browser_set_cookie` | Sets a browser cookie. |
| `ogma_browser_new_tab` | Opens a new browser tab. |
| `ogma_browser_close_tab` | Closes a browser tab. |
| `ogma_browser_get_tabs` | Lists browser tabs. |
| `ogma_browser_click` | Clicks at browser coordinates or target metadata. |
| `ogma_browser_type_text` | Types text into the browser. |
| `ogma_browser_fill_input` | Fills an input field. |
| `ogma_browser_click_selector` | Clicks an element by selector. |
| `ogma_browser_submit_form` | Submits a form. |
| `ogma_browser_get_page_links` | Extracts links from the current page. |
| `ogma_browser_get_page_forms` | Extracts forms from the current page. |
| `ogma_browser_scroll` | Scrolls the current page. |
| `ogma_browser_wait_for_selector` | Waits for an element selector. |
| `ogma_browser_get_network_log` | Gets browser network events. |
| `ogma_browser_go_back` | Goes back in browser history. |
| `ogma_browser_go_forward` | Goes forward in browser history. |
| `ogma_browser_reload` | Reloads the page. |
| `ogma_browser_find_text` | Finds text in the current page. |
| `ogma_browser_clear_data` | Clears browser data. |

### Utilities and Analysis

| Tool | What it does |
| --- | --- |
| `ogma_fetch_sourcemap` | Fetches and inspects a JavaScript source map. |
| `ogma_proto_decode` | Decodes protobuf payloads using configured schemas. |
| `ogma_decode_jwt` | Decodes JWT headers and claims. |
| `ogma_search_js_secrets` | Searches JavaScript responses for exposed secrets and endpoints. |
| `ogma_compare_responses` | Compares two responses. |
| `ogma_bytes_transform` | Performs byte transforms such as encoding, decoding, XOR, hashing, and extraction. |
| `ogma_wasm_inspect` | Inspects a WebAssembly module. |
| `ogma_fingerprint_target` | Identifies target technology from captured traffic and responses. |
| `ogma_think` | Records structured reasoning or plan text inside the MCP session. |
| `ogma_explain_capabilities` | Returns the MCP server capability summary. |

### Match and Replace

| Tool | What it does |
| --- | --- |
| `ogma_list_match_replace_rules` | Lists Match & Replace rules. |
| `ogma_create_match_replace_rule` | Creates a Match & Replace rule. |
| `ogma_toggle_match_replace_rule` | Enables or disables a Match & Replace rule. |
| `ogma_delete_match_replace_rule` | Deletes a Match & Replace rule. |

### Environment Variables

| Tool | What it does |
| --- | --- |
| `ogma_list_env_vars` | Lists environment variable names and metadata. |
| `ogma_set_env_var` | Creates or updates an environment variable. |
| `ogma_get_env_var_value` | Reads an environment variable value when permitted. |

### Projects, Notes, Todos, and Session

| Tool | What it does |
| --- | --- |
| `ogma_list_projects` | Lists projects. |
| `ogma_switch_project` | Switches the active project. |
| `ogma_note_create` | Creates a note. |
| `ogma_note_list` | Lists notes. |
| `ogma_note_get` | Gets one note. |
| `ogma_note_update` | Updates a note. |
| `ogma_note_delete` | Deletes a note. |
| `ogma_todo_create` | Creates a todo. |
| `ogma_todo_list` | Lists todos. |
| `ogma_todo_update` | Updates a todo. |
| `ogma_todo_mark_done` | Marks a todo done. |
| `ogma_todo_delete` | Deletes a todo. |
| `ogma_finish_session` | Finalizes the MCP session with summary, methodology, and recommendations. |
| `ogma_get_session_report` | Gets the current MCP session report. |

## Relationship to Workspace AI

The MCP server is a protocol server used by external tools. The in-app Workspace AI is a Vue/browser feature that calls configured AI providers directly and exposes its own frontend tool list. See [Workspace AI](../guide/workspace-ai.md).
