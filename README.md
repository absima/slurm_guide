# Public documentation frontend

General Slurm setup, usage and maintenance guide, illustrated with three
fictional machines. Three is an example size, not a requirement. Single-node
CPU examples, direct config distribution and shared-workstation owner/headroom
policies are teaching choices, not universal Slurm limits/defaults. Local lab
instructions can be sent separately (for example, via Discord) after publication.

Standalone static site for GitHub Pages. No build tools, server-side code,
external fonts, analytics, private document imports or application dependencies.
index.html is the content source; styles.css/app.js handle layout/interactions.

## Preview locally

From slurm-cluster/frontend:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765. Stop the preview with Ctrl+C. Serve **only this
directory**, not the parent workspace containing internal records.

## Publish safely

Create a separate public documentation repository and copy **only the contents
of this frontend directory** into its root. Do not make the cluster workspace
repository public, commit its private history to the documentation repository,
or copy the runbook, logs, inventories, configs or site-specific scripts.

In the documentation repository's Settings → Pages, select deployment from
the default branch's root directory. Relative asset links support both a
project Pages URL and a custom domain. No workflow or publishing action has
been created/executed from this workspace.

Before publishing, review the frontend files for personal/infrastructure data
and verify all examples remain generic. This site's admin examples can change
node state: they are labelled and must be adapted/used deliberately. Copy buttons
copy text only; they never execute a command. All site examples use fictional
node/environment names and placeholder paths.

## Content scope

- Setup: ten expandable stages and acceptance checks.
- Usage: ordinary-user batch creation, resources, Conda, monitoring/cancellation.
- Maintenance: planned reboots, address changes and preserving setup artifacts.
- Roadmap: environment/data portability, hardening and future expansion.

Operational details belong in the private cluster documentation. This site
must not fetch or link to private workspace documents. New public content needs
sanitization before it is added here.
