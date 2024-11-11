import { ArrowRightIcon } from '@arctic-kit/icons';
import { Box } from '@arctic-kit/snow';
import { CardChip, Card, CardList, CardListItem } from '@/ui/components/Card';
import { ArticleType } from '@/types/ArticleType';

export function ArticleSection({ articles }: { articles: ArticleType[] }) {
  return (
    <CardList>
      {articles.map((article, index) => {
        const title =
          article.title ||
          `${article?.roles?.[0]} | ${article.location} | ${article.organization?.name}`;
        return (
          <CardListItem key={index}>
            <Card
              href={article.organization?.url || article.url}
              titleNote={article.duration}
              titleImgUrl={article.imageUrl}
            >
              <strong>
                {title}
                <ArrowRightIcon className="icon" />
              </strong>
              {article.roles && article.roles.length > 1 && (
                <span>
                  {article.roles
                    .slice(1)
                    .map((position) => position)
                    .join(', ')}
                </span>
              )}
              {article.clientOrganization && (
                <span>{`Client: ${article.clientOrganization.name}`}</span>
              )}
              <Box as="p" sx={{ textAlign: 'left' }}>
                {article.description}
              </Box>
              {article.tags && article.tags.length > 0 && (
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
                  {article.tags?.map((skill, index) => (
                    <CardChip key={index}>{skill}</CardChip>
                  ))}
                </div>
              )}
            </Card>
          </CardListItem>
        );
      })}
    </CardList>
  );
}
