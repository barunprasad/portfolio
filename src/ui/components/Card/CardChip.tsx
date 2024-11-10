import { SnowThemeArgs } from '@arctic-kit/snow';
import { styled } from '@pigment-css/react';

const CardChipContainer = styled.div(
  ({ theme: { vars: theme } }: SnowThemeArgs) => ({
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.secondary[200],
    backgroundColor: 'rgb(45 212 191 / 10%)',
    borderRadius: 9999,
    padding: '4px 12px !important',
    fontSize: 12,
  }),
);
export function CardChip({ children }: { children: React.ReactNode }) {
  return <CardChipContainer>{children}</CardChipContainer>;
}
