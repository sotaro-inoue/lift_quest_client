import { Button } from "@/components/ui/button"

export function Header(){
    return(
        <div className="fixed top-0 left-0 w-full bg-backgrounds z-50 h-12">
            <div className="absolute top-0 left-10">
                <h1 id="logo" className="font-mobobold text-left underline decoration-1 text-6xl">
                    LQ
                </h1>
            </div>

            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-4 border-solid border-2 border-foreground bg-background font-mobosemibold rounded-full px-4 h-full">
                <Button className="bg-background text-foreground rounded-full px-3 py-1 text-sm hover:underline hover:decoration-2">
                    Login
                </Button>
                <Button className="bg-background text-foreground rounded-full px-3 py-1 text-sm hover:underline hover:decoration-2">
                    Sign Up
                </Button>
            </div>
        </div>
    );
}