import * as React from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
  const { threshold = 0.1, root = null, rootMargin = '0px', freezeOnceVisible = true } = options;
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(null);
  const [node, setNode] = React.useState<HTMLElement | null>(null);

  const observer = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(([entry]) => {
      setEntry(entry);
      if (entry.isIntersecting && freezeOnceVisible) {
        observer.current?.disconnect();
      }
    }, {
      threshold,
      root,
      rootMargin,
    });

    const { current: currentObserver } = observer;
    if (node) {
      currentObserver.observe(node);
    }

    return () => {
      currentObserver.disconnect();
    };
  }, [node, threshold, root, rootMargin, freezeOnceVisible]);

  return { ref: setNode, entry, isVisible: !!entry?.isIntersecting };
};

export default useIntersectionObserver;
