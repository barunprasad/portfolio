import { BlogData } from '@/data/blogs';
import { Card } from '@/ui/components/Card/Card';
import { CardList } from '@/ui/components/Card/CardList';
import { CardListItem } from '@/ui/components/Card/CardListItem';
import { ArrowRightIcon } from '@arctic-kit/icons';
import { Box } from '@arctic-kit/snow';

export function BlogSection() {
  return (
    <CardList>
      {BlogData.map((item, index) => (
        <CardListItem key={index}>
          <Card href={item.url} titleImgUrl={item.imgUrl}>
            <strong>
              {item.title}
              <ArrowRightIcon className="icon" />
            </strong>
            <Box as="p" sx={{ textAlign: 'left' }}>
              {item.content}
            </Box>
          </Card>
        </CardListItem>
      ))}
    </CardList>
  );
}
