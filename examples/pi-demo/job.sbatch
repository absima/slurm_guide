#!/usr/bin/env bash
#SBATCH --job-name=pi-demo
#SBATCH --partition=shared
#SBATCH --nodelist=node-a
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1G
#SBATCH --time=00:10:00
#SBATCH --output=slurm-pi-%j.out

set -e

echo "JOB_START job=$SLURM_JOB_ID host=$(hostname -s)"
srun python3 myscript.py
echo "JOB_COMPLETE job=$SLURM_JOB_ID"
