

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function FunctionDescriptionCard1(){
    return (
        <Card className="w-1/3 flex flex-col m-1 animate-in">
            <CardHeader className="h-1/5">
                <CardTitle>トレーニングの記録を管理する。</CardTitle>
                <CardDescription>LiftQuestでは、ご自身のトレーニング記録をグラフで見ることができます。小さな目標をクリアすることで、より大きな目標を達成しましょう！</CardDescription>
            </CardHeader>
            <CardContent className="h-3/5">
                <img src="https://doodleipsum.com/500x500/flat?bg=f5f2b0&i=fdd9dc261e18ddc044aab7240951e98f" alt="Strength Training by Ana Copenicker" />
            </CardContent>
            <CardFooter className="h-1/5">
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    );
};

export function FunctionDescriptionCard2(){
    return (
        <Card className="w-1/3 flex flex-col m-1">
            <CardHeader className="h-1/5">
                <CardTitle>キャラクター育成</CardTitle>
                <CardDescription>あなたの成長とともに、キャラクターも成長します。</CardDescription>
            </CardHeader>
            <CardContent className="h-3/5">
                <img src="https://doodleipsum.com/500x500/flat?bg=f5f2b0&i=e072e675aa8b4dd16be316de11378208" alt="Standing by Ana Copenicker" />
            </CardContent>
            <CardFooter className="h-1/5">
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    );
};

export function FunctionDescriptionCard3(){
    return (
        <Card className="w-1/3 flex flex-col m-1">
            <CardHeader className="h-1/5">
                <CardTitle>ギルドをつくって、仲間と協力する</CardTitle>
                <CardDescription>より大きな目標を達成するには、仲間が欠かせません。</CardDescription>
            </CardHeader>
            <CardContent className="h-3/5">
                <img src="https://doodleipsum.com/500x500/flat?bg=f5f2b0&i=3c729e1b51c474e323d6f1d1eea0232d" alt="Fresh Air by Gustavo Pedrosa" />
            </CardContent>
            <CardFooter className="h-1/5">
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    );
};
