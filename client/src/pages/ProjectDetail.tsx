import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Calendar, Briefcase, Target, Award, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";

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
  challenge: string | null;
  solution: string | null;
  results: string | null;
  testimonial: string | null;
  testimonial_author: string | null;
  metrics: Record<string, string> | null;
  project_url: string | null;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchProject();
    }
  }, [slug]);

  async function fetchProject() {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) throw error;
      setProject(data);

      // Fetch related projects
      if (data) {
        const { data: related } = await supabase
          .from("projects")
          .select("*")
          .eq("domain", data.domain)
          .eq("is_published", true)
          .neq("id", data.id)
          .limit(3);

        setRelatedProjects(related || []);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <Button className="bg-[#4A9B8E] hover:bg-[#4A9B8E]/90">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
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
        <div className="container max-w-6xl">
          <Link href="/projects">
            <Button variant="ghost" className="text-[#2C3E50] hover:text-[#4A9B8E]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>

      {/* Project Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#F5F1E8] to-[#E8E4DC]">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block bg-[#4A9B8E]/10 text-[#4A9B8E] px-4 py-2 rounded-full text-sm font-semibold">
                  {project.domain}
                </span>
                <span className="text-muted-foreground">{project.year}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">{project.title}</h1>
              {project.client && (
                <p className="text-lg text-[#2C3E50]/70 mb-6">Client: {project.client}</p>
              )}
              <p className="text-lg text-[#2C3E50]/80 mb-8">{project.description}</p>
              {project.project_url && (
                <Button asChild className="bg-[#E67E50] hover:bg-[#E67E50]/90 text-white">
                  <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                    View Live Project
                  </a>
                </Button>
              )}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              {project.featured_image ? (
                <img
                  src={project.featured_image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-[#4A9B8E] to-[#2C3E50] flex items-center justify-center">
                  <Briefcase className="h-24 w-24 text-white/20" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F5F1E8] p-6 rounded-xl">
              <Target className="h-8 w-8 text-[#4A9B8E] mb-3" />
              <h3 className="font-bold text-[#2C3E50] mb-2">Scope</h3>
              <p className="text-[#2C3E50]/70">{project.scope}</p>
            </div>
            <div className="bg-[#F5F1E8] p-6 rounded-xl">
              <Briefcase className="h-8 w-8 text-[#E67E50] mb-3" />
              <h3 className="font-bold text-[#2C3E50] mb-2">Domain</h3>
              <p className="text-[#2C3E50]/70">{project.domain}</p>
            </div>
            <div className="bg-[#F5F1E8] p-6 rounded-xl">
              <Calendar className="h-8 w-8 text-[#2C3E50] mb-3" />
              <h3 className="font-bold text-[#2C3E50] mb-2">Year</h3>
              <p className="text-[#2C3E50]/70">{project.year}</p>
            </div>
          </div>

          <div className="mt-8 bg-[#F5F1E8] p-6 rounded-xl">
            <h3 className="font-bold text-[#2C3E50] mb-4">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="bg-white text-[#2C3E50] px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenge, Solution, Results */}
      <section className="py-16">
        <div className="container max-w-4xl">
          {project.challenge && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E67E50]/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-[#E67E50]" />
                </div>
                The Challenge
              </h2>
              <div className="prose prose-lg max-w-none prose-headings:text-[#2C3E50] prose-p:text-[#2C3E50]/80">
                <Streamdown>{project.challenge}</Streamdown>
              </div>
            </div>
          )}

          {project.solution && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#4A9B8E]/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-[#4A9B8E]" />
                </div>
                Our Solution
              </h2>
              <div className="prose prose-lg max-w-none prose-headings:text-[#2C3E50] prose-p:text-[#2C3E50]/80">
                <Streamdown>{project.solution}</Streamdown>
              </div>
            </div>
          )}

          {project.results && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2C3E50]/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-[#2C3E50]" />
                </div>
                Results & Impact
              </h2>
              <div className="prose prose-lg max-w-none prose-headings:text-[#2C3E50] prose-p:text-[#2C3E50]/80">
                <Streamdown>{project.results}</Streamdown>
              </div>
            </div>
          )}

          {/* Metrics */}
          {project.metrics && Object.keys(project.metrics).length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="bg-gradient-to-br from-[#4A9B8E]/10 to-[#2C3E50]/10 p-6 rounded-xl text-center">
                  <div className="text-4xl font-bold text-[#4A9B8E] mb-2">{value}</div>
                  <div className="text-sm text-[#2C3E50]/70 font-medium">{key}</div>
                </div>
              ))}
            </div>
          )}

          {/* Testimonial */}
          {project.testimonial && (
            <div className="bg-gradient-to-br from-[#F5F1E8] to-[#E8E4DC] p-8 md:p-12 rounded-2xl">
              <Users className="h-12 w-12 text-[#4A9B8E] mb-6" />
              <blockquote className="text-xl md:text-2xl text-[#2C3E50] mb-6 italic leading-relaxed">
                "{project.testimonial}"
              </blockquote>
              {project.testimonial_author && (
                <p className="text-[#2C3E50]/70 font-semibold">— {project.testimonial_author}</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-[#F5F1E8]">
          <div className="container max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((related) => (
                <Link key={related.id} href={`/projects/${related.slug}`}>
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
                          <Briefcase className="h-16 w-16 text-[#2C3E50]/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="inline-block text-[#4A9B8E] font-semibold text-xs mb-2">
                        {related.domain}
                      </span>
                      <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#4A9B8E] transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <div className="flex items-center text-[#E67E50] font-semibold text-sm group-hover:gap-2 transition-all mt-auto">
                        View Case Study
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#4A9B8E] to-[#2C3E50] text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-xl mb-8 text-white/90">
            Let's discuss how AI-powered learning solutions can drive results for your organization.
          </p>
          <Link href="/#contact">
            <Button size="lg" className="bg-white text-[#2C3E50] hover:bg-white/90 text-lg px-8 py-6">
              Start a Conversation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
