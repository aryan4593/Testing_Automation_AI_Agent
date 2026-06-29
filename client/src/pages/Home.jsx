import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

function Home() {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_35%),linear-gradient(135deg,_#020617,_#111827)] text-slate-50">
            <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/20 ring-1 ring-cyan-400/30">
                        <Bot className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">QA Automation Studio</p>
                        <p className="text-sm text-slate-400">AI-powered browser testing</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <SignedOut>
                        <SignInButton>
                            <Button variant="outline" className="border-white/15 bg-white/10 text-white hover:bg-white/20">
                                Sign in
                            </Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                                Get started
                            </Button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                        <Link to="/workspace">
                            <Button className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                                Open workspace
                            </Button>
                        </Link>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </header>

            <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-16 pt-6 lg:px-8 lg:pt-10">
                <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur xl:grid-cols-[1.2fr_0.8fr] xl:p-12">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                            <Sparkles className="h-4 w-4" />
                            New: AI-generated Playwright automation flows
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                                Run, review, and ship reliable QA automation faster.
                            </h1>
                            <p className="max-w-2xl text-lg text-slate-300">
                                Connect a repository, generate test cases, execute browser tests, and inspect live logs from a single streamlined workspace.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <SignedOut>
                                <SignUpButton>
                                    <Button size="lg" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                                        Start free
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </SignUpButton>
                                <SignInButton>
                                    <Button size="lg" variant="outline" className="border-white/15 bg-white/10 text-white hover:bg-white/20">
                                        Sign in
                                    </Button>
                                </SignInButton>
                            </SignedOut>

                            <SignedIn>
                                <Link to="/workspace">
                                    <Button size="lg" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                                        Continue to workspace
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </SignedIn>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm text-slate-300">
                            <p className="font-medium text-white">Signed in as {user?.firstName || user?.emailAddresses?.[0]?.emailAddress || "a teammate"}</p>
                            <p className="mt-1 text-slate-400">Your automation runs, logs, and sessions stay organized in one place.</p>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/50 p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold">Secure access</p>
                                <p className="text-sm text-slate-400">Protected workspace and role-based sign-in</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-400/15 text-fuchsia-300">
                                <Workflow className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold">Workflow automation</p>
                                <p className="text-sm text-slate-400">Generate browser tests and review every execution step</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;