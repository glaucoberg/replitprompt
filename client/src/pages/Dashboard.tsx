import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Sparkles, 
  ArrowUpRight, 
  Zap, 
  MessageSquare, 
  LayoutTemplate,
  Star
} from "lucide-react";
import { Link } from "wouter";
import { STATS, RECENT_ACTIVITY, TEMPLATES } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import heroBg from "@assets/generated_images/abstract_ai_tech_background_gradient.png";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Welcome Hero */}
        <div className="relative overflow-hidden rounded-xl border border-border/50 shadow-2xl group">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroBg} 
              alt="Background" 
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>
          
          <div className="relative z-10 p-8 md:p-10 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              <span>Pro Plan Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 tracking-tight">
              Welcome back, John
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Ready to craft your next masterpiece? You have <span className="text-foreground font-semibold">Unlimited</span> generations remaining today.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="/create">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                  <Plus className="w-5 h-5" />
                  New Prompt
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm border-white/10 hover:bg-background/80">
                  <LayoutTemplate className="w-5 h-5" />
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Prompts" 
            value={STATS.totalPrompts} 
            icon={MessageSquare}
            trend="+12%"
            color="text-blue-400"
          />
          <StatsCard 
            title="Favorites" 
            value={STATS.favoriteCount} 
            icon={Star}
            trend="+4"
            color="text-yellow-400"
          />
          <StatsCard 
            title="Templates Used" 
            value={STATS.templatesUsed} 
            icon={LayoutTemplate}
            trend="+8%"
            color="text-purple-400"
          />
          <StatsCard 
            title="Success Rate" 
            value={`${STATS.successRate}%`} 
            icon={Zap}
            trend="+2%"
            color="text-green-400"
          />
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {RECENT_ACTIVITY.map((activity) => (
                <div 
                  key={activity.id}
                  className="group flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-border/80 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center border border-white/5",
                      "bg-gradient-to-br from-white/5 to-white/0 group-hover:from-primary/10 group-hover:to-primary/5 transition-all"
                    )}>
                      <Zap className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {activity.category} • {activity.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      activity.status === "Completed" 
                        ? "bg-green-500/10 text-green-400 border-green-500/20" 
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    )}>
                      {activity.status}
                    </span>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Templates (Side) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-semibold">Trending Templates</h2>
            </div>
            
            <div className="space-y-3">
              {TEMPLATES.slice(0, 3).map((template) => (
                <Card key={template.id} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all cursor-pointer group overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-2 rounded-md bg-primary/10 text-primary">
                        <LayoutTemplate className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-yellow-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{template.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">{template.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{template.uses} uses</span>
                      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Use <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 mt-6">
              <h3 className="font-medium text-primary mb-1">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Using specific constraints in your prompts improves output quality by 40%.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </AppLayout>
  );
}

function StatsCard({ title, value, icon: Icon, trend, color }: any) {
  return (
    <Card className="bg-card/50 border-border/50 hover:bg-card transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className={cn("w-4 h-4 opacity-70", color)} />
        </div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-bold font-heading">{value}</h3>
          <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
