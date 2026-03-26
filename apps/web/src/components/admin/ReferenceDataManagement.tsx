import React, { useEffect, useState } from 'react';
import { referenceApi, type ReferenceItem } from '../../services/api';
import { BookOpen, Trash2, Plus } from 'lucide-react';

type SectionKey = 'specialties' | 'degrees' | 'titles' | 'therapeuticApproaches';

const SECTION_CONFIG: Record<
    SectionKey,
    { title: string; label: string; placeholder: string }
> = {
    specialties: {
        title: 'Uzmanlık Alanları',
        label: 'Yeni uzmanlık alanı',
        placeholder: 'Örn. Klinik Psikoloji',
    },
    degrees: {
        title: 'Mezuniyet Dereceleri / Bölüm',
        label: 'Yeni derece veya bölüm',
        placeholder: 'Örn. Lisans, Yüksek Lisans',
    },
    titles: {
        title: 'Uzman Ünvanları',
        label: 'Yeni ünvan',
        placeholder: 'Örn. Uzman Klinik Psikolog',
    },
    therapeuticApproaches: {
        title: 'Çalışma Ekolleri',
        label: 'Yeni çalışma ekolü',
        placeholder: 'Örn. BDT, Psikanaliz',
    },
};

export const ReferenceDataManagement: React.FC = () => {
    const [specialties, setSpecialties] = useState<ReferenceItem[]>([]);
    const [degrees, setDegrees] = useState<
        (ReferenceItem & { description?: string | null })[]
    >([]);
    const [titles, setTitles] = useState<ReferenceItem[]>([]);
    const [approaches, setApproaches] = useState<ReferenceItem[]>([]);

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const [newSpecialty, setNewSpecialty] = useState('');
    const [newDegree, setNewDegree] = useState('');
    const [newDegreeDesc, setNewDegreeDesc] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newApproach, setNewApproach] = useState('');

    const [saving, setSaving] = useState<SectionKey | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const load = async () => {
        setLoading(true);
        const [s, d, t, a] = await Promise.all([
            referenceApi.getSpecialties(),
            referenceApi.getDegrees(),
            referenceApi.getTitles(),
            referenceApi.getTherapeuticApproaches(),
        ]);

        if (s.success && s.data) setSpecialties(s.data);
        if (d.success && d.data) setDegrees(d.data);
        if (t.success && t.data) setTitles(t.data);
        if (a.success && a.data) setApproaches(a.data);

        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const showMsg = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 4000);
    };

    const handleCreate = async (section: SectionKey) => {
        if (section === 'specialties' && !newSpecialty.trim()) return;
        if (section === 'degrees' && !newDegree.trim()) return;
        if (section === 'titles' && !newTitle.trim()) return;
        if (section === 'therapeuticApproaches' && !newApproach.trim()) return;

        setSaving(section);
        setMessage(null);

        try {
            if (section === 'specialties') {
                const res = await referenceApi.createSpecialty(newSpecialty.trim());
                if (res.success && res.data) {
                    setSpecialties((prev) =>
                        [...prev, res.data!].sort((a, b) => a.name.localeCompare(b.name))
                    );
                    setNewSpecialty('');
                    showMsg('success', 'Uzmanlık alanı eklendi.');
                } else showMsg('error', res.error || 'Eklenemedi');
            } else if (section === 'degrees') {
                const res = await referenceApi.createDegree(
                    newDegree.trim(),
                    newDegreeDesc.trim() || undefined
                );
                if (res.success && res.data) {
                    setDegrees((prev) =>
                        [...prev, res.data!].sort((a, b) => a.name.localeCompare(b.name))
                    );
                    setNewDegree('');
                    setNewDegreeDesc('');
                    showMsg('success', 'Derece / bölüm eklendi.');
                } else showMsg('error', res.error || 'Eklenemedi');
            } else if (section === 'titles') {
                const res = await referenceApi.createTitle(newTitle.trim());
                if (res.success && res.data) {
                    setTitles((prev) =>
                        [...prev, res.data!].sort((a, b) => a.name.localeCompare(b.name))
                    );
                    setNewTitle('');
                    showMsg('success', 'Ünvan eklendi.');
                } else showMsg('error', res.error || 'Eklenemedi');
            } else if (section === 'therapeuticApproaches') {
                const res = await referenceApi.createTherapeuticApproach(newApproach.trim());
                if (res.success && res.data) {
                    setApproaches((prev) =>
                        [...prev, res.data!].sort((a, b) => a.name.localeCompare(b.name))
                    );
                    setNewApproach('');
                    showMsg('success', 'Çalışma ekolü eklendi.');
                } else showMsg('error', res.error || 'Eklenemedi');
            }
        } catch {
            showMsg('error', 'İstek başarısız.');
        } finally {
            setSaving(null);
        }
    };

    const handleDelete = async (section: SectionKey, id: number) => {
        setDeletingId(id);
        setMessage(null);

        try {
            let res;
            if (section === 'specialties') res = await referenceApi.deleteSpecialty(id);
            else if (section === 'degrees') res = await referenceApi.deleteDegree(id);
            else if (section === 'titles') res = await referenceApi.deleteTitle(id);
            else res = await referenceApi.deleteTherapeuticApproach(id);

            if (res.success) {
                if (section === 'specialties')
                    setSpecialties((prev) => prev.filter((x) => x.id !== id));
                else if (section === 'degrees')
                    setDegrees((prev) => prev.filter((x) => x.id !== id));
                else if (section === 'titles')
                    setTitles((prev) => prev.filter((x) => x.id !== id));
                else setApproaches((prev) => prev.filter((x) => x.id !== id));

                showMsg('success', 'Silindi.');
            } else showMsg('error', res.error || 'Silinemedi');
        } catch {
            showMsg('error', 'İstek başarısız.');
        } finally {
            setDeletingId(null);
        }
    };

    const renderSection = (
        section: SectionKey,
        items: ReferenceItem[],
        newValue: string,
        setNewValue: (v: string) => void,
        extraInput?: React.ReactNode
    ) => {
        const config = SECTION_CONFIG[section];
        const isSaving = saving === section;

        return (
            <div
                key={section}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
            >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-teal-500" />
                    {config.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                    <input
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder={config.placeholder}
                        className="flex-1 min-w-[180px] bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-gray-900 font-medium focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        onKeyDown={(e) =>
                            e.key === 'Enter' && handleCreate(section)
                        }
                    />
                    {extraInput}
                    <button
                        type="button"
                        onClick={() => handleCreate(section)}
                        disabled={isSaving || !newValue.trim()}
                        className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {isSaving ? 'Ekleniyor...' : 'Ekle'}
                    </button>
                </div>

                <ul className="space-y-2">
                    {items.length === 0 && (
                        <li className="text-gray-400 text-sm font-medium">Henüz kayıt yok.</li>
                    )}

                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between gap-2 py-2 px-3 bg-gray-50 rounded-xl"
                        >
                            <span className="font-semibold text-gray-800">{item.name}</span>
                            <button
                                type="button"
                                onClick={() => handleDelete(section, item.id)}
                                disabled={deletingId === item.id}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Sil"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <p className="text-gray-500 font-medium">Yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900">Referans Veriler</h1>
                <p className="text-gray-500 mt-1 font-medium">
                    Uzmanlık alanları, çalışma ekolleri, bölüm ve ünvanlar. Uzmanlar kendi
                    profillerinde bu listelerden seçim yapar.
                </p>
            </div>

            {message && (
                <div
                    className={`p-4 rounded-xl text-sm font-bold ${
                        message.type === 'success'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                    }`}
                >
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {renderSection('specialties', specialties, newSpecialty, setNewSpecialty)}

                {renderSection(
                    'degrees',
                    degrees,
                    newDegree,
                    setNewDegree,
                    <input
                        type="text"
                        value={newDegreeDesc}
                        onChange={(e) => setNewDegreeDesc(e.target.value)}
                        placeholder="Açıklama (isteğe bağlı)"
                        className="min-w-[140px] bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-gray-600 text-sm font-medium focus:ring-2 focus:ring-teal-500"
                    />
                )}

                {renderSection('titles', titles, newTitle, setNewTitle)}

                {renderSection(
                    'therapeuticApproaches',
                    approaches,
                    newApproach,
                    setNewApproach
                )}
            </div>
        </div>
    );
};

export default ReferenceDataManagement;

