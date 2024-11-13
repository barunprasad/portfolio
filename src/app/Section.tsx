import { styled } from '@pigment-css/react';

const SectionContainer = styled.section({
  marginBottom: '6rem',

  h3: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--background-color)',
    paddingBottom: '0.3rem',
    zIndex: 10,
  },
});

export function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <SectionContainer id={id} className={`scrollSection`}>
      <h3>{label.replace('-', ' ')}</h3>
      {children}
    </SectionContainer>
  );
}
