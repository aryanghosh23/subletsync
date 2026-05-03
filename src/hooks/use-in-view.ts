import { useEffect, useRef, useState } from "react";

const defaultObserverOptions: IntersectionObserverInit = {
  threshold: 0.08,
  rootMargin: "0px 0px -6% 0px",
};

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true);
      },
      { ...defaultObserverOptions, ...optionsRef.current },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}
