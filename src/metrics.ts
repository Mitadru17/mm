// Opt-in local QA only. No analytics endpoint, cookies, or visitor data collection.
// Read the measurements in the root element's data-local-metrics attribute.
if (
  new URLSearchParams(location.search).has("measure") &&
  ["localhost", "127.0.0.1"].includes(location.hostname)
) {
  const metrics = { lcpMs: 0, cls: 0, maxInteractionMs: 0 };
  const publish = () => {
    document.documentElement.dataset.localMetrics = JSON.stringify(metrics);
  };
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        metrics.lcpMs = Math.round(entry.startTime);
      publish();
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!shift.hadRecentInput) metrics.cls += shift.value;
      }
      publish();
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        metrics.maxInteractionMs = Math.max(
          metrics.maxInteractionMs,
          entry.duration,
        );
      publish();
    }).observe({
      type: "event",
      buffered: true,
      durationThreshold: 16,
    } as PerformanceObserverInit);
  } catch {
    /* Older browsers can still use the complete website. */
  }
}
