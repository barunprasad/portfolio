import { ProjectData } from '@/data/projects';
import { CardChip } from '@/ui/components/Card';
import { Card } from '@/ui/components/Card/Card';
import { CardList } from '@/ui/components/Card/CardList';
import { CardListItem } from '@/ui/components/Card/CardListItem';
import { ArrowRightIcon } from '@arctic-kit/icons';
import { Box } from '@arctic-kit/snow';

export function ProjectSection() {
  return (
    <CardList>
      {ProjectData.map((project, index) => (
        <CardListItem key={index}>
          <Card href={project.url} titleImgUrl={project.imgUrl}>
            <strong>
              {project.title}
              <ArrowRightIcon className="icon" />
            </strong>

            <Box as="p" sx={{ textAlign: 'left' }}>
              {project.content}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: '12px !important',
              }}
            >
              {project.skills.map((skill, index) => (
                <CardChip key={index}>{skill}</CardChip>
              ))}
            </Box>
          </Card>
        </CardListItem>
      ))}
    </CardList>
  );
}
