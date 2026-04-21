import React, { useState } from 'react';
import { Brain, Heart, Users, ChevronRight, CheckCircle, AlertCircle, Sparkles, Clock, ArrowLeft, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../components/common/utils';
import GradientText from '../components/common/GradientText';
interface Question {
    id: number;
    text: string;
    options: { value: number; label: string }[];
}

interface Test {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    bgColor: string;
    duration: string;
    questions: Question[];
}

const tests: Test[] = [
    {
        id: 'anxiety',
        title: 'Anksiyete Testi',
        description: 'Son 2 hafta içinde kendinizi ne sıklıkla aşağıdaki durumlarla karşılaştınız?',
        icon: Brain,
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        duration: '5 Dakika',
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
        icon: Heart,
        color: 'text-rose-500',
        bgColor: 'bg-rose-50',
        duration: '5 Dakika',
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
                text: 'Kendinizi değersiz hissettiniz veya kendinizi başarısız olarak görüp ailenizi hayal kırıklığına uğrattığınızı düşündünüz mu?',
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
        description: 'Aşağıdaki durumlarla ne sıklıkla karşılaşıyorsunuz? Sosyal kaygı düzeyinizi ölçün.',
        icon: Users,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50',
        duration: '5 Dakika',
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
    const navigate = useNavigate();
    const [activeTest, setActiveTest] = useState<Test | null>(null);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [showResult, setShowResult] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleStartTest = (test: Test) => {
        setActiveTest(test);
        setAnswers({});
        setShowResult(false);
        setCurrentQuestion(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAnswer = (questionId: number, value: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));

        if (activeTest && currentQuestion < activeTest.questions.length - 1) {
            setTimeout(() => setCurrentQuestion(prev => prev + 1), 500);
        }
    };

    const calculateScore = () => {
        return Object.values(answers).reduce((sum, val) => sum + val, 0);
    };

    const getResultMessage = (score: number, maxScore: number) => {
        const percentage = (score / maxScore) * 100;

        if (percentage <= 25) {
            return { level: 'Düşük', message: 'Sonuçlarınız düşük düzeyde belirtiler gösteriyor. Genel halinizi korumaya devam edin.', severity: 'low', color: 'text-emerald-500' };
        } else if (percentage <= 50) {
            return { level: 'Orta', message: 'Hafif düzeyde stres/endişe belirtileri gözlemleniyor. Bir uzmanla görüşüp erken önlem almanız faydalı olabilir.', severity: 'medium', color: 'text-primary' };
        } else if (percentage <= 75) {
            return { level: 'Yüksek', message: 'Belirgin düzeyde zorlanma belirtileri mevcut. Uzman desteği alarak bu süreci daha kolay atlatabilirsiniz.', severity: 'high', color: 'text-orange-500' };
        } else {
            return { level: 'Çok Yüksek', message: 'Ciddi düzeyde psikolojik yıpranma gözlemleniyor. Lütfen en kısa sürede profesyonel yardım alın.', severity: 'very-high', color: 'text-rose-500' };
        }
    };

    const handleSubmit = () => {
        setShowResult(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToTests = () => {
        setActiveTest(null);
        setAnswers({});
        setShowResult(false);
        setCurrentQuestion(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Result View
    if (activeTest && showResult) {
        const score = calculateScore();
        const maxScore = activeTest.questions.length * 3;
        const result = getResultMessage(score, maxScore);

        return (
            <div className="min-h-screen bg-white pb-32 pt-40 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="spotlight-static premium-card p-12 md:p-16 rounded-[3rem] border-none shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,67,90,0.05),transparent_50%)]" />
                        
                        <div className="relative z-10 text-center">
                            <div className="mb-10 inline-flex items-center justify-center p-6 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-xl">
                                {result.severity === 'low' ? (
                                    <CheckCircle size={64} className="text-emerald-500" />
                                ) : (
                                    <AlertCircle size={64} className={result.color} />
                                )}
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-heading mb-6 tracking-tighter">
                                {activeTest.title} <br />
                                <span className={cn("italic", result.color)}>Analiz Sonucu</span>
                            </h2>

                            <div className="grid grid-cols-2 gap-6 mb-12">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <p className="text-xs font-black text-muted uppercase tracking-widest mb-2">Toplam Puan</p>
                                    <p className="text-3xl font-black text-heading">{score} <span className="text-muted text-lg">/ {maxScore}</span></p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <p className="text-xs font-black text-muted uppercase tracking-widest mb-2">Genel Düzey</p>
                                    <p className={cn("text-3xl font-black tracking-tighter", result.color)}>{result.level}</p>
                                </div>
                            </div>

                            <p className="text-xl text-muted font-medium leading-relaxed mb-12 px-4">
                                {result.message}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <button
                                    onClick={handleBackToTests}
                                    className="btn-premium bg-slate-100 text-heading hover:bg-slate-200"
                                >
                                    <ArrowLeft size={20} />
                                    Testlere Dön
                                </button>
                                <button
                                    onClick={() => navigate('/find-therapist')}
                                    className="btn-premium bg-primary text-white shadow-2xl shadow-primary/30"
                                >
                                    Uzman Görüşü Al
                                    <ArrowRight size={20} />
                                </button>
                            </div>

                            <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-center gap-3 text-muted text-sm font-bold">
                                <Info size={16} />
                                <p>Bu sonuçlar tıbbi bir teşhis değildir, sadece bilgilendirme amaçlıdır.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Active Test View
    if (activeTest) {
        const question = activeTest.questions[currentQuestion];
        const progress = ((currentQuestion + 1) / activeTest.questions.length) * 100;
        const allAnswered = activeTest.questions.every(q => answers[q.id] !== undefined);

        return (
            <div className="min-h-screen bg-white pb-32 pt-40 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <button
                          onClick={handleBackToTests}
                          className="group flex items-center gap-2 text-sm font-black text-muted hover:text-primary transition-colors"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                            <ArrowLeft size={18} />
                          </div>
                          Vazgeç
                        </button>
                        <div className="flex items-center gap-3">
                            <Clock size={18} className="text-primary" />
                            <span className="text-sm font-black text-heading uppercase tracking-widest">{activeTest.duration} Süre</span>
                        </div>
                    </div>

                    <div className="spotlight-static premium-card p-10 md:p-16 rounded-[3rem] border-none shadow-2xl">
                        {/* Progress Bar */}
                        <div className="mb-16">
                            <div className="flex justify-between items-end mb-4">
                                <h3 className="text-xl font-black text-heading tracking-tight">{activeTest.title}</h3>
                                <span className="text-sm font-black text-primary bg-primary/5 px-4 py-1 rounded-full">
                                    {currentQuestion + 1} / {activeTest.questions.length} Soru
                                </span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-primary transition-all duration-700 ease-out rounded-full"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Question Content */}
                        <div className="mb-16">
                            <h2 className="text-2xl md:text-3xl font-black text-heading mb-10 leading-tight">
                                {question.text}
                            </h2>

                            <div className="grid grid-cols-1 gap-4">
                                {question.options.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleAnswer(question.id, option.value)}
                                        className={cn(
                                            "p-6 rounded-3xl border-2 text-left transition-all duration-300 group flex items-center justify-between",
                                            answers[question.id] === option.value
                                                ? "border-primary bg-primary/5 shadow-lg shadow-primary/5"
                                                : "border-slate-50 hover:border-slate-200 hover:bg-slate-50"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-lg font-bold transition-all",
                                            answers[question.id] === option.value ? "text-primary scale-105 ml-2" : "text-muted"
                                        )}>
                                            {option.label}
                                        </span>
                                        <div className={cn(
                                            "w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center",
                                            answers[question.id] === option.value ? "border-primary bg-primary" : "border-slate-200"
                                        )}>
                                            {answers[question.id] === option.value && <div className="w-2 h-2 rounded-full bg-white" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center gap-6">
                            <button
                                onClick={() => currentQuestion > 0 && setCurrentQuestion(prev => prev - 1)}
                                disabled={currentQuestion === 0}
                                className="flex-1 py-4 text-sm font-black text-muted hover:text-heading disabled:opacity-20 transition-colors uppercase tracking-widest"
                            >
                                Önceki Soru
                            </button>

                            {currentQuestion === activeTest.questions.length - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!allAnswered}
                                    className="flex-[1.5] btn-premium bg-primary text-white shadow-xl shadow-primary/20 disabled:opacity-50"
                                >
                                    Sonucu Analiz Et
                                    <ArrowRight size={20} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                                    disabled={answers[question.id] === undefined}
                                    className="flex-[1.5] btn-premium bg-slate-900 text-white shadow-xl disabled:opacity-30"
                                >
                                    Sonraki Soru
                                    <ArrowRight size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default Grid View
    return (
        <div className="min-h-screen bg-white pb-32 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10" />
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 blur-[120px] rounded-full" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-black uppercase tracking-widest mb-8 border border-primary/10">
                         <Sparkles size={16} />
                         <span>Kendinizi Keşfedin</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-heading leading-[1.1] mb-8 tracking-tighter">
                        Psikolojik <br />
                        <GradientText className="inline-block mt-2">
                            Analiz Testleri
                        </GradientText>
                    </h1>
                    <p className="text-xl text-muted font-medium leading-relaxed max-w-2xl mx-auto">
                        Lisanslı uzmanlarımız tarafından hazırlanan testlerle duygularınızı ve davranışlarınızı daha yakından tanıyın.
                    </p>
                </div>

                {/* Test Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {tests.map((test) => (
                        <div
                            key={test.id}
                            className={cn(
                                "spotlight-static premium-card p-10 flex flex-col items-center text-center group border-none shadow-2xl rounded-[3rem] hover:bg-slate-50 transition-colors duration-500"
                            )}
                        >
                            <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500", test.bgColor, test.color)}>
                                <test.icon size={36} />
                            </div>
                            
                            <h3 className="text-2xl font-black text-heading mb-4 leading-tight group-hover:text-primary transition-colors tracking-tight">
                                {test.title}
                            </h3>
                            
                            <div className="flex items-center gap-3 text-xs font-black text-muted uppercase tracking-widest mb-6 bg-slate-100 px-4 py-1 rounded-full overflow-hidden">
                                <Clock size={14} />
                                {test.duration} • {test.questions.length} Soru
                            </div>

                            <p className="text-muted leading-relaxed font-medium mb-10 flex-grow">
                                {test.description}
                            </p>

                            <button
                                onClick={() => handleStartTest(test)}
                                className="w-full btn-premium bg-slate-900 text-white group-hover:bg-primary transition-all shadow-xl shadow-slate-900/10 group-hover:shadow-primary/20"
                            >
                                Teste Başla
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Important Information Box */}
                <div className="relative group p-1 w-full rounded-[3rem] overflow-hidden">
                    <div className="absolute inset-0 bg-slate-200/50" />
                    <div className="relative bg-white p-12 md:p-16 rounded-[2.8rem] flex flex-col md:flex-row items-center gap-10">
                        <div className="w-20 h-20 rounded-[2rem] bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <ShieldCheck size={40} />
                        </div>
                        <div className="max-w-3xl">
                            <h4 className="text-xl font-black text-heading mb-4 tracking-tight">Önemli Bilgilendirme</h4>
                            <p className="text-muted font-medium leading-relaxed">
                                Bu testler yalnızca farkındalık oluşturma amacı taşımaktadır. Kesin bir tanı koyma veya tedavi planı oluşturma amacıyla kullanılamaz. 
                                Eğer kendinizi psikolojik olarak zorlanmış hissediyorsanız, lütfen <Link to="/find-therapist" className="text-primary font-bold hover:underline">bir ruh sağlığı uzmanına</Link> başvurunuz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
