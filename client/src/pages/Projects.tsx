import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "wouter";
import { Search, Filter, ChevronRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  featured_image: string | null;
  client: string | null;
  domain: string;
  tools: string[];
  scope: string;
  year: number;
  is_published: boolean;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedTool, setSelectedTool] = useState("All");

  const domains = ["All", "Corporate Training", "Higher Education", "Healthcare", "Technology", "Government"];
  const tools = ["All", "Articulate 360", "Adobe Captivate", "Rise 360", "Camtasia", "Custom Development"];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [searchQuery, selectedDomain, selectedTool, projects]);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("year", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
      setFilteredProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }

  function filterProjects() {
    let filtered = projects;

    if (selectedDomain !== "All") {
      filtered = filtered.filter((project) => project.domain === selectedDomain);
    }

    if (selectedTool !== "All") {
      filtered = filtered.filter((project) => project.tools.includes(selectedTool));
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.tools.some((tool) => tool.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
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
              Featured Projects
            </h1>
            <p className="text-lg md:text-xl text-[#2C3E50]/80 mb-8">
              AI-powered learning solutions that deliver measurable results. From corporate training to higher education,
              explore how adaptive design transforms learning outcomes.
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects by title, tools, or description..."
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
            <Filter className="h-5 w-5 text-[#2C3E50]" />
            <h3 className="font-semibold text-[#2C3E50]">Filter by Domain</h3>
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            {domains.map((domain) => (
              <Button
                key={domain}
                variant={selectedDomain === domain ? "default" : "outline"}
                onClick={() => setSelectedDomain(domain)}
                className={
                  selectedDomain === domain
                    ? "bg-[#4A9B8E] hover:bg-[#4A9B8E]/90 text-white"
                    : "border-[#2C3E50]/20 text-[#2C3E50] hover:bg-[#4A9B8E]/10"
                }
              >
                {domain}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-[#2C3E50]" />
            <h3 className="font-semibold text-[#2C3E50]">Filter by Tools</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <Button
                key={tool}
                variant={selectedTool === tool ? "default" : "outline"}
                onClick={() => setSelectedTool(tool)}
                className={
                  selectedTool === tool
                    ? "bg-[#E67E50] hover:bg-[#E67E50]/90 text-white"
                    : "border-[#2C3E50]/20 text-[#2C3E50] hover:bg-[#E67E50]/10"
                }
              >
                {tool}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground mb-4">No projects found</p>
              <p className="text-muted-foreground">
                {searchQuery || selectedDomain !== "All" || selectedTool !== "All"
                  ? "Try adjusting your search or filters"
                  : "Check back soon for new projects"}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.slug}`}>
                    <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-border h-full flex flex-col hover:-translate-y-1">
                      <div className="relative h-56 overflow-hidden">
                        {project.featured_image ? (
                          <img
                            src={project.featured_image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#4A9B8E] to-[#2C3E50] flex items-center justify-center">
                            <Briefcase className="h-20 w-20 text-white/20" />
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#2C3E50]">
                          {project.year}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block bg-[#4A9B8E]/10 text-[#4A9B8E] px-3 py-1 rounded-full text-xs font-semibold">
                            {project.domain}
                          </span>
                          {project.client && (
                            <span className="text-xs text-muted-foreground">• {project.client}</span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#4A9B8E] transition-colors line-clamp-2">
                          {project.title}
                        </h3>

                        <p className="text-sm text-[#2C3E50]/70 mb-4 line-clamp-3 flex-grow">
                          {project.description}
                        </p>

                        <div className="mb-4">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">Tools Used:</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tools.slice(0, 3).map((tool) => (
                              <span
                                key={tool}
                                className="bg-[#F5F1E8] text-[#2C3E50] px-2 py-1 rounded text-xs"
                              >
                                {tool}
                              </span>
                            ))}
                            {project.tools.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{project.tools.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center text-[#E67E50] font-semibold text-sm group-hover:gap-2 transition-all mt-auto">
                          View Case Study
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
