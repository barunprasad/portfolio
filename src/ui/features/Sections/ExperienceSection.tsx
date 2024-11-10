import { ExperienceData } from '@/data/experience';
import { ArrowRightIcon } from '@arctic-kit/icons';
import { Box } from '@arctic-kit/snow';
import { CardChip, Card, CardList, CardListItem } from '@/ui/components/Card';

export function ExperienceSection() {
  return (
    <CardList>
      {ExperienceData.map((experience, index) => (
        <CardListItem key={index}>
          <Card href={experience.company.url} titleNote={experience.tenure}>
            <strong>
              {`${experience.positions[0]} | ${experience.location} | `}
              {experience.company.name}
              <ArrowRightIcon className="icon" />
            </strong>
            {experience.positions.length > 1 && (
              <span>
                {experience.positions
                  .slice(1)
                  .map((position) => position)
                  .join(', ')}
              </span>
            )}
            {experience.client && (
              <span>{`Client: ${experience.client.name}`}</span>
            )}
            <Box as="p" sx={{ textAlign: 'left' }}>
              {experience.profileContent}
            </Box>
            <div
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: '12px !important',
              }}
            >
              {experience.skills.map((skill, index) => (
                <CardChip key={index}>{skill}</CardChip>
              ))}
            </div>
          </Card>
        </CardListItem>
      ))}
    </CardList>
  );
}
