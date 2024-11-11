import { ArrowRightIcon } from '@arctic-kit/icons';
import { SnowThemeArgs } from '@arctic-kit/snow';
import { styled } from '@pigment-css/react';

const ViewResumeContainer = styled.a(
  ({ theme: { vars: theme } }: SnowThemeArgs) => ({
    color: theme.colors.neutral[1000],
    fontSize: 18,
    padding: '12px 4px !important',
    textDecoration: 'none',
    '.icon': {
      width: '16px !important',
      color: theme.colors.neutral[1000],
      transform: 'rotate(-45deg)',
      transitionProperty: 'transform',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '0.15s',
      display: 'inline-block',
      marginLeft: '0.25rem',
      verticalAlign: 'middle',
      translate: '2px -1px',
    },
    '&:hover': {
      textDecoration: 'underline',
      '.icon': {
        transform: 'rotate(-45deg)',
        translate: '4px -3px',
      },
    },
  }),
);

export function ViewResume() {
  return (
    <ViewResumeContainer
      href="https://1drv.ms/w/c/d285ff9f53836da6/EXQGlVPrSupJiQdVF48hLOgBB62xlfBDzOdXXWEwPjLOKQ?e=CPObbG"
      aria-label="View Resume"
      target="_blank"
      rel="noreferrer noopener"
    >
      <strong>
        <span>View Full Resume</span>
        <ArrowRightIcon className="icon" />
      </strong>
    </ViewResumeContainer>
  );
}
