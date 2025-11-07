import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Target, 
  Award,
  Mail,
  MapPin,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Rocket,
  Zap,
  BarChart3,
  Cpu,
  BookOpen,
  Code,
  Palette
} from "lucide-react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Adaptive Learning",
      description: "AI-powered personalization that adjusts to each learner's pace and style, ensuring optimal engagement and retention."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Data-Driven Insights",
      description: "Real-time analytics and reporting that track progress, identify skill gaps, and measure business impact."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Business Growth Acceleration",
      description: "Learning solutions designed to close skill gaps quickly and drive measurable organizational outcomes."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Human-Centered Design",
      description: "Accessible, intuitive experiences that reduce friction and make learning feel natural for all users."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Strategic Alignment",
      description: "Training programs that align directly with business goals, ensuring learning drives real results."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Proven Excellence",
      description: "25+ years of experience delivering effective learning solutions across industries and continents."
    }
  ];

  const projects = [
    {
      title: "AI-Powered Adaptive Learning Platform",
      description: "Machine learning-driven platform that personalizes content delivery based on learner behavior, performance patterns, and cognitive load analysis.",
      tools: ["Python", "TensorFlow", "React", "D3.js"],
      scope: "Enterprise-wide deployment for 5,000+ learners",
      domain: "Corporate Training & Development",
      gradient: "from-primary via-secondary to-accent"
    },
    {
      title: "Natural Language Processing Course Builder",
      description: "AI assistant that helps instructional designers create course content using NLP to analyze learning objectives and auto-generate assessment items.",
      tools: ["GPT-4 API", "Node.js", "Vue.js", "MongoDB"],
      scope: "SaaS platform for educational institutions",
      domain: "EdTech & AI Tools",
      gradient: "from-secondary via-accent to-primary"
    },
    {
      title: "Intelligent Learning Analytics Dashboard",
      description: "Real-time analytics platform using predictive AI to identify at-risk learners and recommend personalized intervention strategies.",
      tools: ["Python", "Scikit-learn", "Tableau", "AWS"],
      scope: "Multi-campus university system (20,000+ students)",
      domain: "Higher Education Analytics",
      gradient: "from-accent via-primary to-secondary"
    },
    {
      title: "VR Simulation with AI Coaching",
      description: "Immersive virtual reality training environment with AI-powered coaching that provides real-time feedback and adaptive scenario difficulty.",
      tools: ["Unity", "C#", "OpenAI API", "Oculus SDK"],
      scope: "Healthcare professional training program",
      domain: "Medical Education & VR",
      gradient: "from-primary/80 via-secondary/80 to-accent/80"
    },
    {
      title: "Microlearning Content Generator",
      description: "AI-driven system that transforms long-form content into bite-sized, mobile-optimized learning modules with automated knowledge checks.",
      tools: ["React Native", "FastAPI", "Claude API", "PostgreSQL"],
      scope: "Mobile-first learning for 10,000+ field workers",
      domain: "Mobile Learning & AI",
      gradient: "from-secondary/80 via-accent/80 to-primary/80"
    },
    {
      title: "Conversational AI Learning Assistant",
      description: "24/7 AI chatbot that answers learner questions, provides study recommendations, and guides users through complex course materials.",
      tools: ["Dialogflow", "Node.js", "React", "Firebase"],
      scope: "Cross-platform support system",
      domain: "AI Chatbots & Support",
      gradient: "from-accent/80 via-primary/80 to-secondary/80"
    }
  ];

  const scrollProjects = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been received. I'll get back to you soon at ${formData.email}.`);
    setFormData({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background pb-20 pt-16 md:pt-24 lg:pt-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium border border-secondary/20">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Learning Solutions</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Turn Learning Into{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Transformation
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Build learning that actually works. With adaptive, human-centered design, I create solutions that deliver real results—empowering users and driving business success.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card p-4 rounded-lg border shadow-sm">
                <Award className="w-5 h-5 text-accent flex-shrink-0" />
                <p>25+ years of helping teams make learning better—for people, organizations, and outcomes.</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Let's Work Together
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 hover:bg-secondary/10 hover:border-secondary"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  View Projects
                </Button>
              </div>
            </div>
            
            {/* Dean's Headshot */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-3xl"></div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-card">
                  <img 
                    src="/dean-headshot.jpg" 
                    alt="Dean Ahlgren - Instructional Designer and AI Learning Consultant" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border-2 border-accent/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">25+</div>
                      <div className="text-xs text-muted-foreground">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background fade-in-section opacity-0 translate-y-8 transition-all duration-700">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose{" "}
              <span className="text-primary">AI-Powered Learning</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Creating adaptive, data-driven learning experiences that close skill gaps and accelerate business growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-accent/50 bg-card"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30 fade-in-section opacity-0 translate-y-8 transition-all duration-700">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">Who I Am</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm Dean Ahlgren—an instructional designer, web strategist, and AI consultant with over 25 years' experience turning complex problems into clear, actionable solutions. From universities to startups, I help teams scale learning, optimize systems, and use their tools more wisely. I help people learn better, think smarter, and get unstuck.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">What I Do</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span>Design scalable, interactive learning with Articulate 360, Brightspace (D2L), and Adobe tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    </div>
                    <span>Build smart, agile workflows and AI-driven automation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                    <span>Optimize websites: UX improvements, SEO tuning, backend clean-up</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span>Collaborate across industries—with SMEs, engineers, healthcare pros, and educators</span>
                  </li>
                </ul>
                <p className="mt-4 text-foreground font-medium">
                  Whether it's course design or digital strategy, I make things work better—for people and outcomes.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-secondary">My Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Design should empower. We create accessible, human-centered digital learning experiences that improve understanding, build practical skills, and support growth—across roles, industries, and communities. My work sits at the intersection of learning, communication, and well-being—grounded in anatomy, mindfulness, and a focus on helping people thrive.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-accent">Approach</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Design for people. Deliver with purpose. Learning is personal. I listen first, design with intention, and keep the user experience front and center. My goal is to reduce friction and make learning feel natural—adapting what works, scaling with purpose, and always focusing on clarity, consistency, and real-world results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-background fade-in-section opacity-0 translate-y-8 transition-all duration-700">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Experience at a Glance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-2 hover:border-primary/50 transition-all bg-card shadow-sm hover:shadow-lg">
              <div className="text-5xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground font-semibold">Years in Learning and Design</div>
              <p className="text-xs mt-2 text-muted-foreground">Building clear, effective digital learning from San Francisco to Seoul to Honolulu</p>
            </Card>
            <Card className="text-center p-6 border-2 hover:border-secondary/50 transition-all bg-card shadow-sm hover:shadow-lg">
              <div className="text-5xl font-bold text-secondary mb-2">18</div>
              <div className="text-sm text-muted-foreground font-semibold">Years Remote Work</div>
              <p className="text-xs mt-2 text-muted-foreground">Built original remote workflows and collaborated globally</p>
            </Card>
            <Card className="text-center p-6 border-2 hover:border-accent/50 transition-all bg-card shadow-sm hover:shadow-lg">
              <div className="text-5xl font-bold text-accent mb-2">200+</div>
              <div className="text-sm text-muted-foreground font-semibold">University Courses</div>
              <p className="text-xs mt-2 text-muted-foreground">Designed everything from foundational courses to immersive VR labs</p>
            </Card>
            <Card className="text-center p-6 border-2 hover:border-primary/50 transition-all bg-card shadow-sm hover:shadow-lg">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">AI</div>
              <div className="text-sm text-muted-foreground font-semibold">Enhanced Development</div>
              <p className="text-xs mt-2 text-muted-foreground">Used AI to streamline design and turn complexity into practical solutions</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-b from-background to-muted/30 fade-in-section opacity-0 translate-y-8 transition-all duration-700">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured AI Learning Projects</h2>
            <p className="text-muted-foreground">Swipe or scroll to explore cutting-edge AI-powered learning experiences</p>
          </div>
          <div className="relative">
            <button
              onClick={() => scrollProjects('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card shadow-lg rounded-full p-3 hover:bg-primary hover:text-primary-foreground transition-all border-2 border-border"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollProjects('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card shadow-lg rounded-full p-3 hover:bg-primary hover:text-primary-foreground transition-all border-2 border-border"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="flex-shrink-0 w-[420px] group cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-accent/50 bg-card"
                >
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                    <Brain className="w-24 h-24 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>
                    
                    <div className="space-y-3 pt-2 border-t">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                          <Code className="w-3 h-3" />
                          Tools & Technologies
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool, i) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-secondary/10 text-secondary hover:bg-secondary/20">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          Scope
                        </div>
                        <p className="text-xs text-muted-foreground">{project.scope}</p>
                      </div>
                      
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Domain
                        </div>
                        <Badge variant="outline" className="text-xs border-accent/50 text-accent">
                          {project.domain}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background fade-in-section opacity-0 translate-y-8 transition-all duration-700">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
              <p className="text-xl text-muted-foreground">
                Building a new learning program? Need to align training with your goals? I'm here to help.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="p-6 border-2 hover:border-primary/30 transition-all bg-card shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <a href="mailto:dean@ahlgren-academy.com" className="text-lg font-medium hover:text-primary transition-colors">
                        dean@ahlgren-academy.com
                      </a>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 border-2 hover:border-secondary/30 transition-all bg-card shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="text-lg font-medium">Honolulu, Hawaii, USA</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 border-2 hover:border-accent/30 transition-all bg-card shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">LinkedIn</div>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-accent transition-colors">
                        Connect
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
              <Card className="p-6 border-2 bg-card shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      rows={4}
                      className="border-2"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 shadow-md">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold">Dean Ahlgren</div>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Creating meaningful connections through smart, human-centered design.
            </p>
            <div className="text-sm text-primary-foreground/60">
              © 2025 Dean Ahlgren. All rights reserved. | Based in Honolulu, available globally.
            </div>
          </div>
        </div>
      </footer>

      {/* CTA Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Let's Work Together</DialogTitle>
            <DialogDescription className="text-base">
              Whether you're launching a course, optimizing workflows, or rethinking your learning strategy, I can help.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              Ready to transform your learning experience? Reach out via the contact form below or email me directly at{" "}
              <a href="mailto:dean@ahlgren-academy.com" className="text-primary hover:underline font-medium">
                dean@ahlgren-academy.com
              </a>
            </p>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                const contactSection = document.querySelector('section:has(form)');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Go to Contact Form
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
