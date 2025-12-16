import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Key, Settings as SettingsIcon, CreditCard, Shield } from "lucide-react";

export default function Settings() {
  return (
    <AppLayout>
       <div className="space-y-6 max-w-4xl animate-in fade-in duration-500">
         <div>
            <h1 className="text-3xl font-heading font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account, API keys, and preferences.</p>
          </div>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-card border border-border/50">
              <TabsTrigger value="account" className="gap-2">
                <User className="w-4 h-4" /> Account
              </TabsTrigger>
              <TabsTrigger value="api" className="gap-2">
                <Key className="w-4 h-4" /> API Keys
              </TabsTrigger>
              <TabsTrigger value="billing" className="gap-2">
                <CreditCard className="w-4 h-4" /> Billing
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2">
                <SettingsIcon className="w-4 h-4" /> Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details and public profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label>First Name</Label>
                       <Input defaultValue="John" />
                     </div>
                     <div className="space-y-2">
                       <Label>Last Name</Label>
                       <Input defaultValue="Doe" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <Label>Email</Label>
                     <Input defaultValue="john@example.com" />
                   </div>
                   <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>Manage your API keys for different providers. Keys are stored locally.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-4">
                     <div className="space-y-2">
                       <Label className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-green-500" /> OpenAI API Key
                       </Label>
                       <div className="flex gap-2">
                         <Input type="password" value="sk-........................" readOnly className="font-mono bg-muted/50" />
                         <Button variant="outline">Edit</Button>
                       </div>
                     </div>
                     <div className="space-y-2">
                       <Label className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-orange-500" /> Anthropic API Key
                       </Label>
                       <div className="flex gap-2">
                         <Input placeholder="Enter sk-ant-..." className="font-mono" />
                         <Button>Save</Button>
                       </div>
                     </div>
                     <div className="space-y-2">
                       <Label className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-blue-500" /> Google Gemini API Key
                       </Label>
                       <div className="flex gap-2">
                         <Input placeholder="Enter AIza..." className="font-mono" />
                         <Button>Save</Button>
                       </div>
                     </div>
                   </div>
                </CardContent>
              </Card>
            </TabsContent>

             <TabsContent value="preferences" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>App Preferences</CardTitle>
                  <CardDescription>Customize your workflow experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                       <Label>Default to Dark Mode</Label>
                       <p className="text-sm text-muted-foreground">Always start in dark mode.</p>
                     </div>
                     <Switch defaultChecked />
                   </div>
                   <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                       <Label>Auto-Save Prompts</Label>
                       <p className="text-sm text-muted-foreground">Automatically save generated prompts to history.</p>
                     </div>
                     <Switch defaultChecked />
                   </div>
                   <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                       <Label>Show Token Count</Label>
                       <p className="text-sm text-muted-foreground">Display token usage estimates.</p>
                     </div>
                     <Switch />
                   </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
       </div>
    </AppLayout>
  );
}
