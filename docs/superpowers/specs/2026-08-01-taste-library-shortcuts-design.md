# Taste Library macOS Shortcuts Design

Date: 2026-08-01

## Purpose

Provide native Apple Shortcuts for opening and stopping the local Taste Library. The open shortcut starts a reusable local development server only when needed, waits until the server is reachable, and then opens the gallery in the default browser. The stop shortcut shuts down only the server owned by this project.

## User Experience

Two signed, importable Apple Shortcut files are provided:

- **Open Taste Library** starts or reuses the server and opens `http://127.0.0.1:8765/`.
- **Stop Taste Library** stops the background server if it is running.

Each shortcut invokes the repository lifecycle script and presents the returned success or error message as a macOS notification. The shortcuts can be run from the Shortcuts app and pinned to the menu bar or Dock.

## Architecture

Server lifecycle logic lives in `scripts/taste-library-server.sh`, with three commands:

- `start`: validate existing state, reuse a healthy server or start a new one, wait for HTTP readiness, then open the browser.
- `stop`: validate that the recorded process belongs to Taste Library, terminate it cleanly, and remove stale state.
- `status`: report whether the owned server is running and reachable.

The Apple Shortcuts are deliberately thin wrappers around this script. This keeps process management testable and makes future changes possible without rebuilding the shortcuts.

The server uses Python's standard-library HTTP server, bound only to `127.0.0.1` on port `8765`, with `/Users/cerebra/Documents/GitHub/taste-library` as its document root. No network installation or additional runtime dependency is required.

## Runtime State

The script stores a PID file and log file in a user-specific directory below `${TMPDIR:-/tmp}`. No runtime files are written into the repository.

Before trusting a PID file, the script verifies both that the process exists and that its command identifies the expected Taste Library server. A stale or unrelated PID is never terminated. Before starting, the script also checks whether port `8765` is occupied by another process and exits with a clear error if so.

## Launch Flow

1. **Open Taste Library** runs the script's `start` command.
2. The script checks for an existing owned server.
3. If the server is healthy, the script reuses it.
4. Otherwise, the script removes stale state, verifies the port is free, and starts Python in the background.
5. The script polls the local URL until it responds or a bounded timeout expires.
6. Only after a successful response does it call `open` for the URL.
7. The shortcut displays the script's result.

This readiness gate prevents Safari from opening to a connection-failed page while the server is still starting or failed to start.

## Stop Flow

1. **Stop Taste Library** runs the script's `stop` command.
2. The script validates the recorded PID and command.
3. It sends a normal termination signal and waits for shutdown.
4. It removes the PID file and reports success.
5. If no owned server is running, it reports that the library was already stopped and still exits successfully.

## Error Handling

- Missing Python: return a clear error without opening the browser.
- Port occupied by another process: leave that process untouched and report the conflict.
- Server exits during startup or never becomes ready: clean up state, preserve the log, and report the log location.
- Stale PID file: remove it after ownership validation fails.
- Repeated launch: reuse the healthy process instead of starting another server.
- Repeated stop: behave idempotently and report that no server was running.

## Testing

Lifecycle behavior is verified independently of the native Shortcut UI. Automated shell tests use a temporary document root, temporary state directory, and configurable test port to cover:

- starting a new server;
- waiting for readiness before success;
- reusing an existing server and PID;
- reporting status;
- stopping the owned server;
- handling repeated stop calls;
- removing stale state safely; and
- refusing to take over an occupied port.

The existing JavaScript test suite must continue to pass. Native Shortcut verification consists of importing both signed files, running the open shortcut twice to confirm reuse, loading the gallery, and running the stop shortcut to confirm the server becomes unreachable.

## Repository Changes

- Add `scripts/taste-library-server.sh`.
- Add lifecycle tests under `tests/`.
- Add two signed `.shortcut` files under `shortcuts/`.
- Extend `README.md` with installation, usage, and optional pinning instructions.

## Out of Scope

- Starting the server automatically at login.
- Exposing the server beyond localhost.
- Replacing the static Python server with a framework or package-managed tool.
- Automatically rebuilding image derivatives or editing gallery metadata.
