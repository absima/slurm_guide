import random
import sys

# Increase these two numbers when you want more work.
realisations = 5
samples = 10000

# The optional part number is used only in the later array lesson.
part = 0
if len(sys.argv) > 1:
    part = int(sys.argv[1])

inside = 0
for trial in range(realisations):
    # Give every trial its own reproducible random sequence.
    rng = random.Random(42 + part * realisations + trial)
    for _ in range(samples):
        x = rng.random()
        y = rng.random()
        if x*x + y*y <= 1:
            inside += 1

    total_points = (trial + 1) * samples
    pi_estimate = 4 * inside / total_points
    print(f"Trial {trial + 1}: pi estimate = {pi_estimate:.6f}", flush=True)

# These two counts let the optional combining script pool the results.
print("COUNTS", inside, total_points)
print("SIMULATION_COMPLETE")
