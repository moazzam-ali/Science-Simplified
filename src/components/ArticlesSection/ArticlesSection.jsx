import "./ArticlesSection.scss";
import ArticleCard from "../ArticleCard/ArticleCard";
import { ArticleCardSkeleton } from "../ArticleCardSkeleton/ArticleCardSkeleton";
import { Unplug } from "lucide-react";

const ArticlesSection = ({ articles, loading, error, sectionTitle }) => {
  return (
    <section className="articles-section padding">
      <div className="boxed">
        <h2 className="heading-tertiary">{sectionTitle}</h2>

        {loading ? (
          <div className="articles-section__list">
            {[...Array(3)].map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="articles-section__error">
            <Unplug className="articles-section__error__icon" />
            <p className="body-large">Something went wrong. Please try again later.</p>
          </div>
        ) : (
          <div className="articles-section__list">
            {articles.map((a) => {
              // Normalize across endpoints:
              const id = a.id;
              const imageUrl = a.image_url;
              const date = a.publication_date ?? a.date ?? "";
              const title = a.title;
              const summary = a.summary;

              const authorName =
                a.author_name ?? a.name ?? a.publisher_name ?? "Anonymous";

              const authorImageUrl =
                a.author_image_url ?? a.photo ?? null;

              // Hide "No Degree"
              const rawCreds = a.author_degree ?? a.degree ?? null;
              const authorCreds =
                rawCreds && rawCreds !== "No Degree" ? rawCreds : null;

              const authorInstitution =
                a.author_university ?? a.university ?? null;

              return (
                <ArticleCard
                  key={id}
                  id={id}
                  imageUrl={imageUrl}
                  date={date}
                  title={title}
                  summary={summary}
                  authorImageUrl={authorImageUrl}
                  authorName={authorName}
                  authorCreds={authorCreds}
                  authorInstitution={authorInstitution}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;
