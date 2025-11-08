import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "wouter";
import { Search, Calendar, Clock, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  is_published: boolean;
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI in Learning", "Instructional Design", "Case Studies", "Best Practices"];

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [searchQuery, selectedCategory, articles]);

  async function fetchArticles() {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
      setFilteredArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }

  function filterArticles() {
    let filtered = articles;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((article) => article.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredArticles(filtered);
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  const featuredArticle = filteredArticles[0];
  const regularArticles = filteredArticles.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F5F1E8] to-[#E8E4DC] py-20 md:py-28">
        <div className="container max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6">
              Articles & Insights
            </h1>
            <p className="text-lg md:text-xl text-[#2C3E50]/80 mb-8">
              Exploring the intersection of AI, instructional design, and transformative learning experiences.
              Practical insights for modern learning professionals.
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles by title, topic, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-white/80 backdrop-blur-sm border-[#2C3E50]/20 focus:border-[#4A9B8E]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-border py-6">
        <div className="container max-w-6xl">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-[#4A9B8E] hover:bg-[#4A9B8E]/90 text-white"
                    : "border-[#2C3E50]/20 text-[#2C3E50] hover:bg-[#4A9B8E]/10"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No articles found</p>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== "All"
                  ? "Try adjusting your search or filter"
                  : "Check back soon for new content"}
              </p>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && (
                <Link href={`/articles/${featuredArticle.slug}`}>
                  <div className="group cursor-pointer mb-16 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-full overflow-hidden">
                        {featuredArticle.featured_image ? (
                          <img
                            src={featuredArticle.featured_image}
                            alt={featuredArticle.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#4A9B8E] to-[#2C3E50] flex items-center justify-center">
                            <Tag className="h-24 w-24 text-white/20" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#E67E50] text-white px-4 py-2 rounded-full text-sm font-semibold">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(featuredArticle.published_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {featuredArticle.read_time} min read
                          </span>
                        </div>
                        <span className="inline-block text-[#4A9B8E] font-semibold text-sm mb-3">
                          {featuredArticle.category}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#4A9B8E] transition-colors">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-lg text-[#2C3E50]/70 mb-6 line-clamp-3">
                          {featuredArticle.excerpt}
                        </p>
                        <div className="flex items-center text-[#E67E50] font-semibold group-hover:gap-3 transition-all">
                          Read Article
                          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Regular Articles Grid */}
              {regularArticles.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularArticles.map((article) => (
                    <Link key={article.id} href={`/articles/${article.slug}`}>
                      <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          {article.featured_image ? (
                            <img
                              src={article.featured_image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#4A9B8E]/20 to-[#2C3E50]/20 flex items-center justify-center">
                              <Tag className="h-16 w-16 text-[#2C3E50]/20" />
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(article.published_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.read_time} min
                            </span>
                          </div>
                          <span className="inline-block text-[#4A9B8E] font-semibold text-xs mb-2">
                            {article.category}
                          </span>
                          <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#4A9B8E] transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-sm text-[#2C3E50]/70 mb-4 line-clamp-3 flex-grow">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center text-[#E67E50] font-semibold text-sm group-hover:gap-2 transition-all">
                            Read More
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
