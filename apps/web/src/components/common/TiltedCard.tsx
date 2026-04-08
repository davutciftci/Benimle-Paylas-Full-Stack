import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from './utils';

interface TiltedCardProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    rotateX?: number;
    rotateY?: number;
}

export default function TiltedCard({
    children,
    className,
    containerClassName,
    rotateX = 15,
    rotateY = 15,
}: TiltedCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateXValue = useTransform(mouseYSpring, [-0.5, 0.5], [rotateX, -rotateX]);
    const rotateYValue = useTransform(mouseXSpring, [-0.5, 0.5], [-rotateY, rotateY]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            className={cn("perspective-1000", containerClassName)}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: rotateXValue,
                    rotateY: rotateYValue,
                    transformStyle: "preserve-3d",
                }}
                className={cn(
                    "relative premium-card",
                    className
                )}
            >
                {children}
            </motion.div>
        </div>
    );
}
