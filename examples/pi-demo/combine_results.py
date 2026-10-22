import sys

# First argument: how many completed job logs we expect.
expected = int(sys.argv[1])
filenames = sys.argv[2:]
if expected < 1 or len(filenames) != expected or len(set(filenames)) != expected:
    raise ValueError("Provide the expected number of different job logs.")

inside_total = 0
samples_total = 0

for filename in filenames:
    with open(filename) as file:
        lines = file.readlines()

    # A check-only, cancelled or failed job must not count as a completed run.
    complete = any(line.startswith("ARRAY_COMPLETE ") for line in lines)
    counts = [line.split() for line in lines if line.startswith("COUNTS ")]
    if not complete or len(counts) != 1:
        raise ValueError(f"Missing complete calculation in {filename}")

    # Each Python job prints: COUNTS number_inside number_sampled
    _, inside, samples = counts[0]
    inside_total += int(inside)
    samples_total += int(samples)

# Pool counts, rather than averaging rounded estimates.
print("Combined pi estimate:", 4 * inside_total / samples_total)
print("ARRAY_RESULTS_COMPLETE")
