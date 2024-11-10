'use client';
import { useActiveSection } from './ActiveSectionContext';

function ScrollSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const { containerRef } = useActiveSection();
  return (
    <section ref={containerRef} className={className}>
      {children}
    </section>
  );
}

export default ScrollSection;
