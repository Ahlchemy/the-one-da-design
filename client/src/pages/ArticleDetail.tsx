import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { Calendar, Clock, ArrowLeft, Share2, Tag as TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  category: string;
  tags: string[];
  author: string;
  published_at: string;
  read_time: number;
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  async function fetchArticle() {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) throw error;
      setArticle(data);

      // Fetch related articles
      if (data) {
        const { data: related } = await supabase
          .from("articles")
          .select("*")
          .eq("category", data.category)
          .eq("is_published", true)
          .neq("id", data.id)
          .limit(3);

        setRelatedArticles(related || []);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  async function handleShare() {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share failed:", error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/articles">
            <Button className="bg-[#4A9B8E] hover:bg-[#4A9B8E]/90">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="bg-[#F5F1E8] border-b border-border py-4">
        <div className="container max-w-4xl">
          <Link href="/articles">
            <Button variant="ghost" className="text-[#2C3E50] hover:text-[#4A9B8E]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12 md:py-16">
        <div className="container max-w-4xl">
          {/* Category & Metadata */}
          <div className="mb-6">
            <span className="inline-block bg-[#4A9B8E]/10 text-[#4A9B8E] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {article.category}
            </span>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(article.published_at)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.read_time} min read
              </span>
              <span>By {article.author}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-[#2C3E50]/70 mb-8 leading-relaxed">{article.excerpt}</p>

          {/* Share Button */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-[#2C3E50]/20 text-[#2C3E50] hover:bg-[#4A9B8E]/10"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Article
            </Button>
          </div>

          {/* Featured Image */}
          {article.featured_image && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-[#2C3E50] prose-p:text-[#2C3E50]/80 prose-a:text-[#4A9B8E] prose-strong:text-[#2C3E50] prose-code:text-[#E67E50] prose-pre:bg-[#2C3E50] prose-pre:text-white">
            <Streamdown>{article.content}</Streamdown>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center gap-3">
                <TagIcon className="h-5 w-5 text-muted-foreground" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#F5F1E8] text-[#2C3E50] px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 p-8 bg-gradient-to-br from-[#F5F1E8] to-[#E8E4DC] rounded-2xl">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4A9B8E] to-[#2C3E50] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                DA
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">{article.author}</h3>
                <p className="text-[#2C3E50]/70 mb-4">
                  Learning experience designer with 25+ years of experience helping teams make learning better—for people, organizations, and outcomes. Specializing in AI-powered learning solutions and adaptive instructional design.
                </p>
                <Link href="/#contact">
                  <Button className="bg-[#E67E50] hover:bg-[#E67E50]/90 text-white">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-[#F5F1E8]">
          <div className="container max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/articles/${related.slug}`}>
                  <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      {related.featured_image ? (
                        <img
                          src={related.featured_image}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#4A9B8E]/20 to-[#2C3E50]/20 flex items-center justify-center">
                          <TagIcon className="h-16 w-16 text-[#2C3E50]/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="inline-block text-[#4A9B8E] font-semibold text-xs mb-2">
                        {related.category}
                      </span>
                      <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#4A9B8E] transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-[#2C3E50]/70 line-clamp-3">{related.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
