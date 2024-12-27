import empty from '@/assets/empty.png';

export default function Empty({ title, description }: { title: string; description: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-64 bg-background text-foreground">
            <img src={empty} alt={"empty"} className="w-20" />
            <div className="space-y-4 text-center">
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    )
}
