import React, { useState } from 'react';
import { Brain, Heart, Users, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
    id: number;
    text: string;
    options: { value: number; label: string }[];
}

interface Test {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    duration: string;
    questions: Question[];
}

const tests: Test[] = [
    {
        id: 'anxiety',
        title: 'Anksiyete Testi',
        description: 'Son 2 hafta içinde kendinizi ne sıklıkla aşağıdaki durumlarla karşılaştınız?',
        icon: <Brain size={48} />,
        color: '#00435a',
        duration: '5 dakika',
        questions: [
            {
                id: 1,
                text: 'Gergin, endişeli veya sinirlerinizin gerilmiş olduğunu hissettiniz mi?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Birkaç gün' },
                    { value: 2, label: 'Günlerin yarısından fazlası' },
                    { value: 3, label: 'Neredeyse her gün' }
                ]
            },
            {
                id: 2,
                text: 'Endişelenmeyi durduramadığınız veya kontrol edemediğiniz zamanlar oldu mu?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Birkaç gün' },
                    { value: 2, label: 'Günlerin yarısından fazlası' },
                    { value: 3, label: 'Neredeyse her gün' }
                ]
            },
            {
                id: 3,
                text: 'Farklı şeyler hakkında çok fazla endişelendiniz mi?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Birkaç gün' },
                    { value: 2, label: 'Günlerin yarısından fazlası' },
                    { value: 3, label: 'Neredeyse her gün' }
                ]
            },
            {
                id: 4,
                text: 'Rahatlamakta zorluk çektiniz mi?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Birkaç gün' },
                    { value: 2, label: 'Günlerin yarısından fazlası' },
                    { value: 3, label: 'Neredeyse her gün' }
                ]
            },
            {
                id: 5,
                text: 'O kadar huzursuz oldunuz ki yerinde oturmak zordu?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Birkaç gün' },
                    { value: 2, label: 'Günlerin yarısından fazlası' },
                    { value: 3, label: 'Neredeyse her gün' }
                ]
            }
        ]
    },
    {
        id: 'depression',
        title: 'Depresyon Testi',
        description: 'Son 2 hafta içinde aşağıdaki sorunlardan ne sıklıkla rahatsız oldunuz?',
        icon: <Heart size={48} />,
        color: '#f28f3b',
        duration: '5 dakika',
        questions: [
            {
                id: 1,
                text: 'Bir şeyler yapmaya karşı çok az ilgi veya zevk duydunuz mu?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Birkaç gün' },
                    { value: 2, label: 'Günlerin yarısından fazlası' },
                    { value: 3, label: 'Neredeyse her gün' }
                ]
            },
            {
                id: 2,
                text: 'Kendinizi çökmüş, depresif veya umutsuz hissettiniz mi?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Birkaç gün' },
                    { value: 2, label: 'Günlerin yarısından fazlası' },
                    { value: 3, label: 'Neredeyse her gün' }
                ]
            },
            {
                id: 3,
                text: 'Uyumakta zorluk çektiniz, kesintisiz uyuyamadınız veya çok fazla uyudunuz mu?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Birkaç gün' },
                    { value: 2, label: 'Günlerin yarısından fazlası' },
                    { value: 3, label: 'Neredeyse her gün' }
                ]
            },
            {
                id: 4,
                text: 'Yorgun hissettiniz veya enerjiniz azaldı mı?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Birkaç gün' },
                    { value: 2, label: 'Günlerin yarısından fazlası' },
                    { value: 3, label: 'Neredeyse her gün' }
                ]
            },
            {
                id: 5,
                text: 'Kendinizi değersiz hissettiniz veya kendinizi başarısız olarak görüp ailenizi hayal kırıklığına uğrattığınızı düşündünüz mü?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Birkaç gün' },
                    { value: 2, label: 'Günlerin yarısından fazlası' },
                    { value: 3, label: 'Neredeyse her gün' }
                ]
            }
        ]
    },
    {
        id: 'social-phobia',
        title: 'Sosyal Fobi Testi',
        description: 'Aşağıdaki durumlarla ne sıklıkla karşılaşıyorsunuz?',
        icon: <Users size={48} />,
        color: '#8aa6b1',
        duration: '5 dakika',
        questions: [
            {
                id: 1,
                text: 'Topluluk önünde konuşmaktan korkar mısınız?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Biraz' },
                    { value: 2, label: 'Oldukça' },
                    { value: 3, label: 'Çok fazla' }
                ]
            },
            {
                id: 2,
                text: 'Tanımadığınız insanlarla konuşmaktan kaçınır mısınız?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Biraz' },
                    { value: 2, label: 'Oldukça' },
                    { value: 3, label: 'Çok fazla' }
                ]
            },
            {
                id: 3,
                text: 'Sosyal ortamlarda yargılanmaktan endişe duyar mısınız?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Biraz' },
                    { value: 2, label: 'Oldukça' },
                    { value: 3, label: 'Çok fazla' }
                ]
            },
            {
                id: 4,
                text: 'Partilere veya sosyal etkinliklere katılmaktan kaçınır mısınız?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Biraz' },
                    { value: 2, label: 'Oldukça' },
                    { value: 3, label: 'Çok fazla' }
                ]
            },
            {
                id: 5,
                text: 'Başkalarının önünde bir şey yaparken (yemek yemek, yazmak vb.) rahatsız hisseder misiniz?',
                options: [
                    { value: 0, label: 'Hiç' },
                    { value: 1, label: 'Biraz' },
                    { value: 2, label: 'Oldukça' },
                    { value: 3, label: 'Çok fazla' }
                ]
            }
        ]
    }
];

export default function PsychologicalTestsPage() {
    const [activeTest, setActiveTest] = useState<Test | null>(null);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [showResult, setShowResult] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleStartTest = (test: Test) => {
        setActiveTest(test);
        setAnswers({});
        setShowResult(false);
        setCurrentQuestion(0);
    };

    const handleAnswer = (questionId: number, value: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));

        if (activeTest && currentQuestion < activeTest.questions.length - 1) {
            setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
        }
    };

    const calculateScore = () => {
        return Object.values(answers).reduce((sum, val) => sum + val, 0);
    };

    const getResultMessage = (score: number, maxScore: number) => {
        const percentage = (score / maxScore) * 100;

        if (percentage <= 25) {
            return { level: 'Düşük', message: 'Sonuçlarınız düşük düzeyde belirtiler gösteriyor.', severity: 'low' };
        } else if (percentage <= 50) {
            return { level: 'Orta', message: 'Sonuçlarınız orta düzeyde belirtiler gösteriyor. Bir uzmanla görüşmenizi öneririz.', severity: 'medium' };
        } else if (percentage <= 75) {
            return { level: 'Yüksek', message: 'Sonuçlarınız yüksek düzeyde belirtiler gösteriyor. Profesyonel destek almanızı öneriyoruz.', severity: 'high' };
        } else {
            return { level: 'Çok Yüksek', message: 'Sonuçlarınız çok yüksek düzeyde belirtiler gösteriyor. Lütfen en kısa sürede bir uzmana danışın.', severity: 'very-high' };
        }
    };

    const handleSubmit = () => {
        setShowResult(true);
    };

    const handleBackToTests = () => {
        setActiveTest(null);
        setAnswers({});
        setShowResult(false);
        setCurrentQuestion(0);
    };

    if (activeTest && showResult) {
        const score = calculateScore();
        const maxScore = activeTest.questions.length * 3;
        const result = getResultMessage(score, maxScore);

        return (
            <div className="font-nunito min-h-screen" style={{ backgroundColor: '#f4f4f4' }}>
                <div className="max-w-2xl mx-auto px-4 py-12 pt-24">
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="mb-6">
                            {result.severity === 'low' ? (
                                <CheckCircle size={64} className="mx-auto" style={{ color: '#10b981' }} />
                            ) : (
                                <AlertCircle size={64} className="mx-auto" style={{ color: result.severity === 'very-high' ? '#ef4444' : '#f28f3b' }} />
                            )}
                        </div>

                        <h2 className="text-3xl font-bold mb-4" style={{ color: '#00435a' }}>
                            {activeTest.title} Sonucu
                        </h2>

                        <div className="mb-6">
                            <p className="text-lg mb-2" style={{ color: '#00435a' }}>
                                Puanınız: <strong>{score} / {maxScore}</strong>
                            </p>
                            <p className="text-xl font-semibold mb-4" style={{ color: activeTest.color }}>
                                Düzey: {result.level}
                            </p>
                            <p style={{ color: '#00435a', opacity: 0.8 }}>
                                {result.message}
                            </p>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left rounded">
                            <p className="text-sm text-yellow-800">
                                <strong>Önemli:</strong> Bu test sadece bilgilendirme amaçlıdır ve profesyonel bir değerlendirmenin yerini alamaz.
                                Kesin bir tanı için mutlaka bir ruh sağlığı uzmanına başvurunuz.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleBackToTests}
                                className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                                style={{ backgroundColor: '#8aa6b1', color: 'white' }}
                            >
                                Testlere Dön
                            </button>
                            <Link
                                to="/find-therapist"
                                className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                                style={{ backgroundColor: '#f28f3b', color: 'white' }}
                            >
                                Psikolog Bul
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (activeTest) {
        const question = activeTest.questions[currentQuestion];
        const progress = ((currentQuestion + 1) / activeTest.questions.length) * 100;
        const allAnswered = activeTest.questions.every(q => answers[q.id] !== undefined);

        return (
            <div className="font-nunito min-h-screen" style={{ backgroundColor: '#f4f4f4' }}>
                <div className="max-w-2xl mx-auto px-4 py-12 pt-24">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        {/* Progress */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm mb-2" style={{ color: '#00435a' }}>
                                <span>{activeTest.title}</span>
                                <span>{currentQuestion + 1} / {activeTest.questions.length}</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full transition-all duration-300 rounded-full"
                                    style={{ width: `${progress}%`, backgroundColor: activeTest.color }}
                                ></div>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-6" style={{ color: '#00435a' }}>
                                {question.text}
                            </h3>

                            <div className="space-y-3">
                                {question.options.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleAnswer(question.id, option.value)}
                                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${answers[question.id] === option.value
                                                ? 'border-opacity-100 shadow-md'
                                                : 'border-gray-200 hover:border-opacity-50'
                                            }`}
                                        style={{
                                            borderColor: answers[question.id] === option.value ? activeTest.color : undefined,
                                            backgroundColor: answers[question.id] === option.value ? `${activeTest.color}10` : 'white'
                                        }}
                                    >
                                        <span style={{ color: '#00435a' }}>{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between">
                            <button
                                onClick={() => currentQuestion > 0 && setCurrentQuestion(prev => prev - 1)}
                                disabled={currentQuestion === 0}
                                className="px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: '#f4f4f4', color: '#00435a' }}
                            >
                                Önceki
                            </button>

                            {currentQuestion === activeTest.questions.length - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!allAnswered}
                                    className="px-6 py-2 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: '#f28f3b' }}
                                >
                                    Sonucu Gör
                                </button>
                            ) : (
                                <button
                                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                                    disabled={answers[question.id] === undefined}
                                    className="px-6 py-2 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: activeTest.color }}
                                >
                                    Sonraki
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleBackToTests}
                        className="mt-6 text-sm hover:underline block mx-auto"
                        style={{ color: '#8aa6b1' }}
                    >
                        ← Testlere Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="font-nunito min-h-screen" style={{ backgroundColor: '#f4f4f4' }}>
            <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#00435a' }}>
                        Psikolojik Testler
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: '#00435a', opacity: 0.8 }}>
                        Kendinizi daha iyi anlamak için aşağıdaki testleri çözebilirsiniz.
                        Bu testler sadece bilgilendirme amaçlıdır ve profesyonel bir tanının yerini almaz.
                    </p>
                </div>

                {/* Test Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tests.map((test) => (
                        <div
                            key={test.id}
                            className="bg-white rounded-2xl shadow-sm border p-8 hover:shadow-lg transition-all duration-300"
                            style={{ borderColor: test.color, borderWidth: '2px' }}
                        >
                            {/* Icon */}
                            <div className="mb-6 flex justify-center" style={{ color: test.color }}>
                                {test.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold mb-3 text-center" style={{ color: '#00435a' }}>
                                {test.title}
                            </h3>

                            {/* Duration */}
                            <p className="text-center mb-4" style={{ color: '#8aa6b1' }}>
                                ⏱ {test.duration} • {test.questions.length} soru
                            </p>

                            {/* Description */}
                            <p className="text-center mb-6" style={{ color: '#00435a', opacity: 0.8 }}>
                                {test.description}
                            </p>

                            {/* Start Button */}
                            <button
                                onClick={() => handleStartTest(test)}
                                className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                                style={{ backgroundColor: test.color }}
                            >
                                Teste Başla
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Disclaimer */}
                <div className="mt-12 bg-white rounded-xl p-6 border" style={{ borderColor: '#8aa6b1' }}>
                    <p className="text-center text-sm" style={{ color: '#00435a', opacity: 0.8 }}>
                        <strong>Önemli Bilgilendirme:</strong> Bu testler yalnızca bilgilendirme ve farkındalık oluşturma amacı taşımaktadır.
                        Kesin bir tanı koyma veya tedavi planı oluşturma amacıyla kullanılamaz.
                        Herhangi bir psikolojik sorun yaşadığınızı düşünüyorsanız, lütfen bir ruh sağlığı uzmanına başvurunuz.
                    </p>
                </div>
            </div>
        </div>
    );
}
