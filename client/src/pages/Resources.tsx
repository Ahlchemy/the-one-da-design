import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Download, FileText, Video, BookOpen, Wrench, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  topic: string;
  file_url: string | null;
  external_url: string | null;
  thumbnail: string | null;
  download_count: number;
  is_published: boolean;
  created_at: string;
}

const typeIcons = {
  Template: FileText,
  Guide: BookOpen,
  Tool: Wrench,
  Webinar: Video,
};

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");

  const types = ["All", "Template", "Guide", "Tool", "Webinar"];
  const topics = ["All", "AI in Learning", "Instructional Design", "Assessment", "Content Development"];

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [searchQuery, selectedType, selectedTopic, resources]);

  async function fetchResources() {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setResources(data || []);
      setFilteredResources(data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  }

  function filterResources() {
    let filtered = resources;

    if (selectedType !== "All") {
      filtered = filtered.filter((resource) => resource.type === selectedType);
    }

    if (selectedTopic !== "All") {
      filtered = filtered.filter((resource) => resource.topic === selectedTopic);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  }

  async function handleDownload(resource: Resource) {
    // Increment download count
    await supabase
      .from("resources")
      .update({ download_count: resource.download_count + 1 })
      .eq("id", resource.id);

    // Open file or external URL
    if (resource.file_url) {
      window.open(resource.file_url, "_blank");
    } else if (resource.external_url) {
      window.open(resource.external_url, "_blank");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading resources...</p>
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
              Learning Resources
            </h1>
            <p className="text-lg md:text-xl text-[#2C3E50]/80 mb-8">
              Free templates, guides, and tools to accelerate your learning design projects. Download practical resources
              that you can use immediately to improve learning outcomes.
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-white/80 backdrop-blur-sm border-[#2C3E50]/20 focus:border-[#4A9B8E]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b border-border py-6">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-[#2C3E50]" />
            <h3 className="font-semibold text-[#2C3E50]">Filter by Type</h3>
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            {types.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className={
                  selectedType === type
                    ? "bg-[#4A9B8E] hover:bg-[#4A9B8E]/90 text-white"
                    : "border-[#2C3E50]/20 text-[#2C3E50] hover:bg-[#4A9B8E]/10"
                }
              >
                {type}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-[#2C3E50]" />
            <h3 className="font-semibold text-[#2C3E50]">Filter by Topic</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {topics.map((topic) => (
              <Button
                key={topic}
                variant={selectedTopic === topic ? "default" : "outline"}
                onClick={() => setSelectedTopic(topic)}
                className={
                  selectedTopic === topic
                    ? "bg-[#E67E50] hover:bg-[#E67E50]/90 text-white"
                    : "border-[#2C3E50]/20 text-[#2C3E50] hover:bg-[#E67E50]/10"
                }
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          {filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground mb-4">No resources found</p>
              <p className="text-muted-foreground">
                {searchQuery || selectedType !== "All" || selectedTopic !== "All"
                  ? "Try adjusting your search or filters"
                  : "Check back soon for new resources"}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource) => {
                  const Icon = typeIcons[resource.type as keyof typeof typeIcons] || FileText;
                  
                  return (
                    <div
                      key={resource.id}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-border flex flex-col hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#4A9B8E]/10 to-[#2C3E50]/10">
                        {resource.thumbnail ? (
                          <img
                            src={resource.thumbnail}
                            alt={resource.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Icon className="h-20 w-20 text-[#2C3E50]/20" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-[#2C3E50] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {resource.type}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-3">
                          <span className="inline-block bg-[#4A9B8E]/10 text-[#4A9B8E] px-3 py-1 rounded-full text-xs font-semibold">
                            {resource.topic}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#4A9B8E] transition-colors">
                          {resource.title}
                        </h3>

                        <p className="text-sm text-[#2C3E50]/70 mb-4 flex-grow line-clamp-3">
                          {resource.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {resource.download_count} downloads
                          </span>
                          <Button
                            onClick={() => handleDownload(resource)}
                            className="bg-[#E67E50] hover:bg-[#E67E50]/90 text-white"
                          >
                            {resource.file_url ? (
                              <>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </>
                            ) : (
                              <>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Access
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#F5F1E8] to-[#E8E4DC]">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-6">
            Need Custom Learning Solutions?
          </h2>
          <p className="text-xl text-[#2C3E50]/70 mb-8">
            These resources are just the beginning. Let's discuss how I can create tailored AI-powered learning
            experiences for your specific needs.
          </p>
          <Button size="lg" asChild className="bg-[#4A9B8E] hover:bg-[#4A9B8E]/90 text-white text-lg px-8 py-6">
            <a href="/#contact">Get in Touch</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
