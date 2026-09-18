


export function initTabs(root) {
  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;

  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

  function selectTab(nextTab) {
    tabs.forEach((tab, index) => {
      const selected = tab === nextTab;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[index].hidden = !selected;
    });
    nextTab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));

    tab.addEventListener('keydown', (event) => {
      let nextIndex = null;

      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;

      if (nextIndex !== null) {
        event.preventDefault();
        selectTab(tabs[nextIndex]);
      }
    });
  });
}
