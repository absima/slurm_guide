#!/usr/bin/env bash
#SBATCH --job-name=pi-array
#SBATCH --partition=shared
#SBATCH --array=0-5%3
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1G
#SBATCH --time=00:10:00
#SBATCH --output=slurm-pi-array-%A_%a.out

set -e

source "/path/to/conda/etc/profile.d/conda.sh"
conda activate mypyenv

echo "ARRAY_START array=$SLURM_ARRAY_JOB_ID part=$SLURM_ARRAY_TASK_ID host=$(hostname -s)"
srun python myscript.py "$SLURM_ARRAY_TASK_ID"
echo "ARRAY_COMPLETE array=$SLURM_ARRAY_JOB_ID part=$SLURM_ARRAY_TASK_ID"
