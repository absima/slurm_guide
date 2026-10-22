# Slurm Field Guide — public website

Static, user-first Slurm documentation for the existing Netlify site; also
compatible with GitHub Pages. No framework/build step, analytics or private
document imports.

## Pages and teaching order

index.html is one sequential user guide:
1. Explain the existing private, per-user ~/Server shared storage and prepare
   ~/Server/slurm-pi-demo there. Do not create a fake Server when access fails.
2. Understand the short myscript.py quarter-disk Monte Carlo calculation.
3. Write job.sbatch.
4. Check shell syntax and Slurm's resource request.
5. Submit the calculation.
6. Monitor, read logs and cancel deliberately.
7. Increase realisations/samples by editing two Python settings.
8. Run independent parts with a job array; optionally combine their counts.
9. Adapt the workflow to a real project/environment.

maintenance.html holds administrator setup, shared-storage configuration,
maintenance/recovery and planning. The header Users / Administrators switch
defaults to Users. This is navigation, not password protection. The old
tutorial.html redirects to the corresponding main-page section.

## Simple example files

- examples/pi-demo/myscript.py: short counting loops, two workload settings,
  reproducible per-trial seeds and printed results. No argument parser,
  JSON, filesystem management, application check mode or main-function wrapper.
- Its optional positional part number is introduced only in the array lesson.
  Distinct trial seeds preserve the same estimator: 4 * total hits / total points.
  The final COUNTS line makes later pooling possible without separate result files.
- examples/pi-demo/job.sbatch: requests one node/task/CPU, 1 GiB and ten minutes.
  Edit the example shared queue name for the site. No node pin; Slurm selects a node.
  Prints job markers and launches srun python3 myscript.py; no Conda required.
  Submit with sbatch job.sbatch; no custom modes or --run argument required.
  set -e prevents success markers after failed activation or task execution.
- An optional page snippet adds --check-only before the calculation.
  Only after insertion does this argument skip calculation. This is a real
  Slurm job, may create __pycache__, and checks Python syntax only—not imports,
  inputs, runtime correctness or resource needs.
- examples/pi-demo/job-array.sbatch: six one-CPU jobs, at most three concurrent.
  Like the first job, no node pin; several jobs may run on one machine. Each passes its array index
  to the same Python script. Shared paths and Python 3 on eligible nodes are required.
  Submit with sbatch job-array.sbatch.
- examples/pi-demo/combine_results.py: small commented optional helper. Takes an
  expected log count and filenames, requires different completed logs with one
  COUNTS record each, and pools their integer hit/sample counts. It is not a
  full provenance/overlap/settings validator: use matching parts from one run.

--check-only belongs only to the optional snippet, not native Slurm.
Slurm --test-only is a separate scheduler test; it does not run the batch file.
Optional Conda instructions explain where to add activation, replacing mypyenv
with the user’s own environment name and adapting the installation path.
The site does not submit jobs, change queues/configuration or run commands.

styles.css/app.js provide themes, audience/section navigation, copy controls and
legacy admin-link handling. tutorial.js loads canonical downloadable sources
using textContent; displayed examples and downloads therefore match.

Code and relative output logs stay together in the shared project directory.
Submit from that directory; other local home folders are not automatically shared.
Server is an administrator-configured lab storage path, not built-in Slurm storage.

## Preview locally

From this frontend directory:

```bash
python3 -m http.server 8770 --bind 127.0.0.1
```

Open http://127.0.0.1:8770/. Stop with Ctrl+C. Serve only this public directory,
not the private parent workspace. Use HTTP rather than file:// so code panels
can load. Downloads and manual links remain available with JavaScript off.

## Verify

```bash
python3 -B -m unittest discover -s tests -v
```

Eleven local tests cover shared-project instructions, the short reproducible calculation, unchanged serial/
partitioned hit counts, count pooling, incomplete/duplicate log rejection,
batch simplicity/syntax, mocked Conda/check/run/array launches and failure
handling, links/anchors, geometry
sample classification, ordered user navigation and audience separation.
These tests do not use real Slurm scheduling or node placement. Cluster
acceptance must be done separately. Browser checks cover responsive layout,
source panels and navigation; local checks are not a deployment.
Previous browser checks covered source/download matching, visible short Python
code, initially collapsed optional combining, mobile width and JavaScript errors.
The latest batch simplification was checked locally with mocked Conda/srun,
not a live cluster or a new browser session. The serial-versus-partitioned count test confirms the estimator
and reproducible trial sequences are preserved.

## Publish safely

Redeploy the complete frontend directory to the existing Netlify site,
including maintenance.html, tutorial.html, tutorial.js and examples/.
GitHub Pages can publish these same files from the documentation repository root.

Never publish the private parent workspace/history: actual account/IP mappings,
runbooks, inventories, logs, keys and cluster configuration stay private.
Examples use fictional node names and generic paths. Keep lab-specific queue,
storage and support instructions in a separate internal reference.

Old index.html #setup/#storage/#maintenance/#next links redirect to the admin
page with JavaScript enabled. Old tutorial deep links redirect to the same
sections of the consolidated user guide.
