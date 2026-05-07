import * as React from 'react';

interface AppointmentCreatedEmailProps {
    recipientName: string;
    counterpartName: string;
    counterpartRole: 'expert' | 'user';
    date: string;
    startTime: string;
    endTime: string;
    sessionType: 'online' | 'in-person';
    notes?: string;
}

export const AppointmentCreatedEmail: React.FC<AppointmentCreatedEmailProps> = ({
    recipientName,
    counterpartName,
    counterpartRole,
    date,
    startTime,
    endTime,
    sessionType,
    notes,
}) => {
    const counterpartLabel = counterpartRole === 'expert' ? 'Uzman' : 'Danisan';
    return (
        <html lang="tr">
            <head>
                <meta charSet="UTF-8" />
                <title>Yeni Randevu Bilgilendirmesi</title>
            </head>
            <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0 }}>
                <table width="100%" cellPadding={0} cellSpacing={0}>
                    <tbody>
                        <tr>
                            <td align="center" style={{ padding: '40px 0' }}>
                                <table width="600" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ backgroundColor: '#00435a', padding: '28px 32px', textAlign: 'center' }}>
                                                <h1 style={{ color: '#ffffff', margin: 0, fontSize: '22px' }}>Randevu Olusturuldu</h1>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '30px 32px' }}>
                                                <p style={{ marginTop: 0, color: '#334155' }}>
                                                    Merhaba <strong>{recipientName}</strong>,
                                                </p>
                                                <p style={{ color: '#334155' }}>
                                                    Yeni bir seans planlandi. Asagidaki bilgilerle randevunuz takvime eklenmistir.
                                                </p>
                                                <table width="100%" cellPadding={10} cellSpacing={0} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', margin: '20px 0' }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '40%', color: '#64748b' }}><strong>{counterpartLabel}</strong></td>
                                                            <td style={{ color: '#0f172a' }}>{counterpartName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ color: '#64748b' }}><strong>Tarih</strong></td>
                                                            <td style={{ color: '#0f172a' }}>{date}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ color: '#64748b' }}><strong>Saat</strong></td>
                                                            <td style={{ color: '#0f172a' }}>{startTime} - {endTime}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ color: '#64748b' }}><strong>Seans Tipi</strong></td>
                                                            <td style={{ color: '#0f172a' }}>{sessionType === 'online' ? 'Online' : 'Yuz yuze'}</td>
                                                        </tr>
                                                        {notes ? (
                                                            <tr>
                                                                <td style={{ color: '#64748b' }}><strong>Not</strong></td>
                                                                <td style={{ color: '#0f172a' }}>{notes}</td>
                                                            </tr>
                                                        ) : null}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    );
};
