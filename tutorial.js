// Load downloadable sources into the examples: the displayed and saved files agree.
document.querySelectorAll('[data-example-source]').forEach(async (block) => {
  const button = block.querySelector('.copy-button');
  const code = block.querySelector('code');
  button.disabled = true;
  try {
    const response = await fetch(block.dataset.exampleSource);
    if (!response.ok) throw new Error('Example unavailable');
    code.textContent = await response.text();
    button.disabled = false;
  } catch {
    code.textContent = 'Unable to load this example. Use its download link, or serve the site over HTTP and refresh.';
  }
});
