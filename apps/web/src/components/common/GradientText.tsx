import React from 'react';
import { cn } from './utils';

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    colors?: string[]; // e.g. ["#ffaa40", "#9c40ff", "#ffaa40"]
    animationSpeed?: number; // in seconds
    showBorder?: boolean;
}

export default function GradientText({
    children,
    className,
    colors = ["#00435a", "#0ea5e9", "#10b981", "#00435a"],
    animationSpeed = 8,
    showBorder = false,
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        backgroundSize: "300% 100%",
        animation: `gradient-move ${animationSpeed}s linear infinite`,
    };

    return (
        <div
            className={cn(
                "relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium transition-shadow duration-500",
                showBorder ? "bg-white/10 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.06)] backdrop-blur-sm" : "",
                className
            )}
        >
            {showBorder && (
                <div
                    className="absolute inset-0 rounded-[1.25rem] border border-transparent [mask-image:linear-gradient(white,white)] before:absolute before:inset-0 before:rounded-[1.25rem] before:border before:border-white/20 before:content-['']"
                    style={gradientStyle}
                />
            )}
            <div
                className="relative z-10 bg-clip-text text-transparent inline-block"
                style={gradientStyle}
            >
                {children}
            </div>
            
            <style>{`
                @keyframes gradient-move {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
}
