import React, { useState, useEffect, useRef } from 'react';
import { HandMetal } from 'lucide-react';

const SignLanguageSupport: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50" ref={dropdownRef}>
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 glass-card p-6 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center gap-3 mb-4 text-primary">
                        <HandMetal className="w-6 h-6" />
                        <h3 className="text-lg font-extrabold text-heading">İşaret Dili Desteği</h3>
                    </div>
                    <p className="text-sm text-muted mb-6 leading-relaxed">
                        İşitme engelli kullanıcılarımız için görüntülü görüşme ile işaret dili desteği sunuyoruz. Size yardımcı olmaktan mutluluk duyarız.
                    </p>
                    <button
                        className="btn-premium w-full bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
                    >
                        Görüntülü Görüşme Başlat
                    </button>
                </div>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center bg-slate-900 text-white relative group"
                aria-label="İşaret Dili Desteği"
            >
                <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 transition-opacity" />
                <HandMetal className="w-8 h-8" />
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white animate-pulse" />
                )}
            </button>
        </div>
    );
};

export default SignLanguageSupport;
