import { 
  Image, Video, Globe, Code, FileText, Music, 
  MonitorPlay, Megaphone, GraduationCap, Sparkles,
  Zap, Clock, Star, LayoutTemplate, History
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

export const CATEGORIES: Category[] = [
  { 
    id: "image", 
    name: "Image Generation", 
    description: "Photos, illustrations, art, logos, concepts", 
    icon: Image,
    color: "text-purple-400"
  },
  { 
    id: "video", 
    name: "Video Creation", 
    description: "Animations, commercials, explainers", 
    icon: Video,
    color: "text-pink-400" 
  },
  { 
    id: "web", 
    name: "Website Dev", 
    description: "Landing pages, apps, portfolios, e-commerce", 
    icon: Globe,
    color: "text-blue-400"
  },
  { 
    id: "code", 
    name: "Code Generation", 
    description: "Functions, APIs, algorithms, scripts", 
    icon: Code,
    color: "text-green-400"
  },
  { 
    id: "text", 
    name: "Text Creation", 
    description: "Articles, blogs, emails, scripts, copy", 
    icon: FileText,
    color: "text-yellow-400"
  },
  { 
    id: "audio", 
    name: "Audio/Music", 
    description: "Songs, voiceovers, sound effects", 
    icon: Music,
    color: "text-red-400"
  },
  { 
    id: "presentation", 
    name: "Presentations", 
    description: "Slideshows, pitch decks, educational", 
    icon: MonitorPlay,
    color: "text-orange-400"
  },
  { 
    id: "marketing", 
    name: "Marketing", 
    description: "Ads, landing pages, email campaigns", 
    icon: Megaphone,
    color: "text-indigo-400"
  },
  { 
    id: "education", 
    name: "Education", 
    description: "Lesson plans, quizzes, study guides", 
    icon: GraduationCap,
    color: "text-teal-400"
  },
  { 
    id: "custom", 
    name: "Custom", 
    description: "Specialized needs and other requests", 
    icon: Sparkles,
    color: "text-gray-400"
  },
];

export const STATS = {
  totalPrompts: 124,
  favoriteCount: 18,
  templatesUsed: 45,
  successRate: 92
};

export const RECENT_ACTIVITY = [
  {
    id: 1,
    title: "Cyberpunk City Landscape",
    category: "Image Generation",
    date: "2 mins ago",
    status: "Completed"
  },
  {
    id: 2,
    title: "React Auth Component",
    category: "Code Generation",
    date: "1 hour ago",
    status: "Completed"
  },
  {
    id: 3,
    title: "Product Launch Email",
    category: "Marketing",
    date: "3 hours ago",
    status: "Draft"
  },
  {
    id: 4,
    title: "Lo-fi Study Beats",
    category: "Audio/Music",
    date: "Yesterday",
    status: "Completed"
  },
  {
    id: 5,
    title: "SaaS Landing Page",
    category: "Website Dev",
    date: "Yesterday",
    status: "Completed"
  }
];

export const TEMPLATES = [
  {
    id: 1,
    title: "Professional Headshot",
    category: "Image Generation",
    description: "Generate professional LinkedIn-style headshots from basic descriptions.",
    author: "PromptMaster",
    rating: 4.9,
    uses: 1250,
    tags: ["Photography", "Professional", "Portrait"]
  },
  {
    id: 2,
    title: "SEO Blog Post Writer",
    category: "Text Creation",
    description: "Create fully optimized SEO articles with proper structure and keywords.",
    author: "ContentKing",
    rating: 4.8,
    uses: 980,
    tags: ["SEO", "Writing", "Marketing"]
  },
  {
    id: 3,
    title: "React Component Generator",
    category: "Code Generation",
    description: "Generate clean, typed React components with Tailwind CSS.",
    author: "DevWizard",
    rating: 4.9,
    uses: 2100,
    tags: ["React", "Code", "Frontend"]
  },
  {
    id: 4,
    title: "Cinematic Movie Trailer",
    category: "Video Creation",
    description: "Prompts for Gen-2 or Runway to create cinematic trailer shots.",
    author: "FilmAI",
    rating: 4.7,
    uses: 650,
    tags: ["Video", "Cinematic", "Film"]
  },
  {
    id: 5,
    title: "Startup Pitch Deck",
    category: "Presentations",
    description: "Structure for a winning 10-slide startup pitch deck.",
    author: "FounderOne",
    rating: 4.8,
    uses: 890,
    tags: ["Business", "Startup", "Pitch"]
  }
];

export const AI_MODELS = [
  {
    id: "gpt4",
    name: "GPT-4o",
    provider: "OpenAI",
    strengths: ["Creative", "Context", "Reasoning"],
    speed: "Fast",
    cost: "$$",
    color: "bg-green-500"
  },
  {
    id: "claude3",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    strengths: ["Writing", "Coding", "Safety"],
    speed: "Fast",
    cost: "$$",
    color: "bg-orange-500"
  },
  {
    id: "gemini",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    strengths: ["Multimodal", "Analysis", "Context Window"],
    speed: "Very Fast",
    cost: "$",
    color: "bg-blue-500"
  }
];
