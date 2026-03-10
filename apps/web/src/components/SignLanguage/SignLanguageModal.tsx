import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { api } from '../../services/api';
import { SignLanguageWord } from '../../types';
import { FingerspellView } from './TIDHandSigns';

interface Props {
    text: string;
    onClose: () => void;
}

const TURKISH_LETTERS: Record<string, string> = {
    A: '🅐', B: '🅑', C: '🅒', Ç: 'Ç', D: '🅓',
    E: '🅔', F: '🅕', G: '🅖', Ğ: 'Ğ', H: '🅗',
    I: '🅘', İ: 'İ', J: '🅙', K: '🅚', L: '🅛',
    M: '🅜', N: '🅝', O: '🅞', Ö: 'Ö', P: '🅟',
    R: '🅡', S: '🅢', Ş: 'Ş', T: '🅣', U: '🅤',
    Ü: 'Ü', V: '🅥', Y: '🅨', Z: '🅩',
};


const SignLanguageModal: React.FC<Props> = ({ text, onClose }) => {
    const words = text.trim().split(/\s+/);
    const [wordIndex, setWordIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [wordData, setWordData] = useState<SignLanguageWord | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const currentWord = words[wordIndex];

    const fetchWord = useCallback(async (word: string) => {
        setIsLoading(true);
        setWordData(null);
        const result = await api.signLanguage.getByWord(word);
        if (result.success && result.data) {
            setWordData(result.data);
        } else {
            setWordData({
                id: 0, word, videoUrl: null, hasVideo: false,
                isActive: true, fingerspell: true,
                createdAt: '', updatedAt: '', category: null,
            });
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchWord(currentWord);
    }, [currentWord, fetchWord]);

    useEffect(() => {
        if (videoRef.current && wordData?.videoUrl) {
            videoRef.current.load();
            videoRef.current.play().catch(() => {});
        }
    }, [wordData?.videoUrl]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && wordIndex < words.length - 1)
                setWordIndex(i => i + 1);
            if (e.key === 'ArrowLeft' && wordIndex > 0)
                setWordIndex(i => i - 1);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [wordIndex, words.length, onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Kapat */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Kelime başlığı */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold" style={{ color: '#1f2937' }}>
                        "{currentWord}"
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                        {wordIndex + 1} / {words.length} kelime
                    </p>
                </div>

                {/* Tüm kelimeler — mini navigasyon */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {words.map((w, i) => (
                        <button
                            key={i}
                            onClick={() => setWordIndex(i)}
                            className="text-xs px-2 py-1 rounded-full transition-all"
                            style={{
                                backgroundColor: i === wordIndex ? '#1f2937' : '#f6f7f8',
                                color: i === wordIndex ? '#f6f7f8' : '#1f2937',
                            }}
                        >
                            {w}
                        </button>
                    ))}
                </div>

                {/* İçerik */}
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <div
                            className="w-8 h-8 rounded-full border-4 animate-spin"
                            style={{ borderColor: '#1f2937', borderTopColor: 'transparent' }}
                        />
                    </div>
                ) : wordData?.hasVideo && wordData?.videoUrl ? (
                    <video ref={videoRef} className="w-full rounded-lg" controls playsInline>
                        <source src={wordData.videoUrl} type="video/mp4" />
                    </video>
                ) : (
                    <FingerspellView word={currentWord} />
                )}

                {/* Navigasyon */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setWordIndex(i => i - 1)}
                        disabled={wordIndex === 0}
                        className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg transition-all disabled:opacity-30"
                        style={{ backgroundColor: '#f6f7f8', color: '#1f2937' }}
                    >
                        <ChevronLeft size={16} /> Önceki
                    </button>
                    <button
                        onClick={() => setWordIndex(i => i + 1)}
                        disabled={wordIndex === words.length - 1}
                        className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg transition-all disabled:opacity-30"
                        style={{ backgroundColor: '#1f2937', color: '#f6f7f8' }}
                    >
                        Sonraki <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};



export default SignLanguageModal;