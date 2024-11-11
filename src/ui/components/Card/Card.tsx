import { Box, SnowThemeArgs } from '@arctic-kit/snow';
import Image from 'next/image';
import { styled } from '@pigment-css/react';

const Container = styled.a(({ theme: { vars: theme } }: SnowThemeArgs) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: 24,
  width: '100%',
  fontSize: 14,
  '.text': {
    color: theme.colors.grey[800],
    strong: {
      display: 'block',
      fontWeight: 'bold',
      color: theme.colors.neutral[1000],
      marginBottom: 4,
      textAlign: 'left',
    },

    p: {
      margin: 0,
      color: theme.colors.grey[800],
    },
  },
  '.header': {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 500,
  },

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
  a: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },

  '&:hover': {
    '.icon': {
      transform: 'rotate(-45deg)',
      translate: '4px -3px',
    },
  },
  '@media screen and (max-width: 992px)': {
    flexDirection: 'column',
    gap: 4,
    '.header': {
      textAlign: 'left',
    },
    '.imageContainer': {
      display: 'none',
    },
  },
}));
export function Card({
  href,
  titleNote,
  children,
  titleImgUrl,
}: {
  href: string;
  children: React.ReactNode;
  titleNote?: string;
  titleImgUrl?: string;
}) {
  return (
    <Container href={href} target="_blank" rel="noreferrer noopener">
      {titleNote && (
        <div sx={{ minWidth: 150 }} className={`text header`}>
          {titleNote}
        </div>
      )}
      {titleImgUrl && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            minWidth: 150,
            paddingTop: '8px !important',
          }}
          className={'imageContainer'}
        >
          <Image
            src={titleImgUrl}
            alt="Title Image Url"
            width={100}
            height={100}
          />
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        className={'text'}
      >
        {children}
      </Box>
    </Container>
  );
}
