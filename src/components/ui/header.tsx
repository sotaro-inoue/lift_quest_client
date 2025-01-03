import { Button } from "@/components/ui/button"
import Link from "next/link";

export function Header(){
    return(
        <div className="fixed top-0 left-0 w-full bg-backgrounds z-50 h-12">
            <div className="absolute top-0 left-10">
                <Link href="/">
                    <h1 id="logo" className="font-mobobold text-left underline decoration-2 text-3xl sm:text-6xl">
                        LQ
                    </h1>
                </Link>
            </div>

            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-4 border-solid border-2 border-foreground bg-background font-mobosemibold rounded-full px-4 h-full">
                <Link href="/login">
                    <Button className="bg-background text-foreground rounded-full px-3 py-1 text-sm hover:underline hover:decoration-2">
                        ログイン
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button className="bg-background text-foreground rounded-full px-3 py-1 text-sm hover:underline hover:decoration-2">
                        アカウント作成
                    </Button>
                </Link>
                <Link href="/contact">
                    <Button className="bg-background text-foreground rounded-full px-3 py-1 text-sm hover:underline hover:decoration-2">
                        お問い合せ
                    </Button>
                </Link>
            </div>
        </div>
    );
}