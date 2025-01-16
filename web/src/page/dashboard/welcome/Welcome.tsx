import BlurFade from "@/components/magicui/blur-fade.tsx";

export function Welcome() {
    return (
        <section id="header">
            <BlurFade delay={0.25} inView>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Hello👋
                </h2>
            </BlurFade>
            <BlurFade delay={0.25 * 2} inView>
                <span className="text-pretty text-xl tracking-tighter sm:text-3xl xl:text-4xl/none">
                    Welcome to Git Star Center Community!
                </span>
            </BlurFade>
        </section>
    );
}
