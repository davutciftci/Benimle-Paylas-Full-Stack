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
        <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 mb-2 animate-fade-in-up">
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#1f2937' }}>İşaret Dili Desteği</h3>
                    <p className="text-sm mb-4" style={{ color: '#1f2937', opacity: 0.8 }}>
                        İşitme engelli kullanıcılarımız için görüntülü görüşme ile işaret dili desteği sunuyoruz.
                    </p>
                    <button
                        className="w-full py-2 px-4 rounded-md transition-opacity duration-200 text-sm font-medium hover:opacity-90"
                        style={{ backgroundColor: '#1f2937', color: '#f6f7f8' }}
                    >
                        Görüntülü Görüşme Başlat
                    </button>
                </div>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                    backgroundColor: '#1f2937',
                    color: '#f6f7f8'
                }}
                aria-label="İşaret Dili Desteği"
            >
                <HandMetal className="w-6 h-6" />
            </button>
        </div>
    );
};

export default SignLanguageSupport;
