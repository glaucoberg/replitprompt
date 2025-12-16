import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BookOpen, FileText, Lightbulb, ChevronRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ARTICLES = [
  {
    id: 1,
    title: "The Art of Few-Shot Prompting",
    category: "Advanced Techniques",
    readTime: "5 min read",
    description: "Learn how to provide examples to the AI to significantly improve output quality and consistency.",
    tags: ["GPT-4", "Technique"]
  },
  {
    id: 2,
    title: "Structuring Prompts for Code Generation",
    category: "Development",
    readTime: "8 min read",
    description: "Best practices for getting clean, bug-free code from LLMs. Includes context setting and constraint definition.",
    tags: ["Coding", "Best Practices"]
  },
  {
    id: 3,
    title: "Midjourney v6 Style Guide",
    category: "Image Generation",
    readTime: "6 min read",
    description: "A comprehensive guide to the new lighting and texture parameters in Midjourney v6.",
    tags: ["Midjourney", "Art"]
  },
  {
    id: 4,
    title: "Chain of Thought Reasoning",
    category: "Logic & Reasoning",
    readTime: "7 min read",
    description: "How to force the AI to show its work, reducing hallucinations in complex logical tasks.",
    tags: ["Reasoning", "Accuracy"]
  },
  {
    id: 5,
    title: "System Prompts vs. User Prompts",
    category: "Fundamentals",
    readTime: "4 min read",
    description: "Understanding the difference and when to use the System message for behavior control.",
    tags: ["Basics", "Configuration"]
  }
];

export default function KnowledgeBase() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/30">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex items-center gap-2 text-primary mb-4">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Prompt Engineering Academy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Master the Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Generative Intelligence</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Explore our comprehensive library of guides, tutorials, and research papers to take your prompt engineering skills to the expert level.
            </p>
            
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for guides, techniques, or concepts..." 
                className="pl-12 h-12 bg-background/80 backdrop-blur border-primary/20 focus:border-primary/50 text-lg shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer group">
            <CardHeader>
              <Zap className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Essential basics for beginners.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20 hover:border-purple-500/40 transition-colors cursor-pointer group">
            <CardHeader>
              <Lightbulb className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <CardTitle>Advanced Techniques</CardTitle>
              <CardDescription>Few-shot, Chain of Thought, and more.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20 hover:border-green-500/40 transition-colors cursor-pointer group">
             <CardHeader>
              <FileText className="w-8 h-8 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
              <CardTitle>Reference Library</CardTitle>
              <CardDescription>Parameter lists and model documentation.</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Latest Articles */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-bold">Latest Guides</h2>
          <div className="grid gap-4">
            {ARTICLES.map((article) => (
              <div 
                key={article.id}
                className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-xl border border-border/50 bg-card/40 hover:bg-card/60 hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {article.description}
                  </p>
                </div>
                <Button variant="ghost" className="shrink-0 group-hover:translate-x-1 transition-transform">
                  Read Article <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
