import React, { useState, useCallback, useRef } from 'react';
import SignLanguageModal from './SignLanguageModal';

interface Props {
    children: string;
    className?: string;
    style?: React.CSSProperties;
    as?: keyof JSX.IntrinsicElements;
    blockNavigation?: boolean; // Link/button sarmalında true yap
    onNavigate?: () => void;   // yönlendirme fonksiyonu
}

const SignText: React.FC<Props> = ({
    children, className, style,
    as: Tag = 'span',
    blockNavigation = false,
    onNavigate,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const clickedOnceRef = useRef(false);

    const handleClick = useCallback((e: React.MouseEvent) => {
        if (!blockNavigation) {
            setIsModalOpen(true);
            return;
        }

        if (!clickedOnceRef.current) {
            // 1. tıklama — modal aç, yönlendirmeyi engelle
            e.preventDefault();
            e.stopPropagation();
            clickedOnceRef.current = true;
            setIsModalOpen(true);
        } else {
            // 2. tıklama — modal kapat, yönlendir
            clickedOnceRef.current = false;
            setIsModalOpen(false);
            onNavigate?.();
        }
    }, [blockNavigation, onNavigate]);

    return (
        <>
            <Tag
                className={className}
                style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textDecorationStyle: 'dotted',
                    textDecorationColor: '#1f2937',
                    ...style,
                }}
                onClick={handleClick}
                title="İşaret dili için tıklayın"
            >
                {children}
            </Tag>

            {isModalOpen && (
                <SignLanguageModal
                    text={children}
                    onClose={() => {
                        setIsModalOpen(false);
                    }}
                />
            )}
        </>
    );
};

export default SignText;