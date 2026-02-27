import * as React from 'react';

interface AppointmentConfirmationEmailProps {
    userName: string;
    expertName: string;
    date: string;
    startTime: string;
    endTime: string;
    sessionType: 'online' | 'in-person';
    meetingLink?: string;
}

export const AppointmentConfirmationEmail: React.FC<AppointmentConfirmationEmailProps> = ({
    userName,
    expertName,
    date,
    startTime,
    endTime,
    sessionType,
    meetingLink,
}) => {
    return (
        <html lang="tr">
        <head>
            <meta charSet="UTF-8" />
            <title>Randevu Onayı</title>
        </head>
        <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0 }}>
            <table width="100%" cellPadding={0} cellSpacing={0}>
                <tr>
                    <td align="center" style={{ padding: '40px 0' }}>
                        <table width="600" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <tr>
                                <td style={{ backgroundColor: '#059669', padding: '32px', textAlign: 'center' }}>
                                    <h1 style={{ color: '#ffffff', margin: 0, fontSize: '24px' }}>✅ Randevunuz Onaylandı</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '40px 32px' }}>
                                    <p style={{ color: '#475569', lineHeight: '1.6' }}>
                                        Merhaba <strong>{userName}</strong>,
                                    </p>
                                    <p style={{ color: '#475569', lineHeight: '1.6' }}>
                                        <strong>{expertName}</strong> ile randevunuz onaylandı.
                                    </p>
                                    <table width="100%" cellPadding={12} cellSpacing={0} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', margin: '24px 0' }}>
                                        <tr>
                                            <td style={{ color: '#64748b', width: '40%' }}><strong>Tarih</strong></td>
                                            <td style={{ color: '#1e293b' }}>{date}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ color: '#64748b' }}><strong>Saat</strong></td>
                                            <td style={{ color: '#1e293b' }}>{startTime} - {endTime}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ color: '#64748b' }}><strong>Seans Tipi</strong></td>
                                            <td style={{ color: '#1e293b' }}>{sessionType === 'online' ? 'Online' : 'Yüz yüze'}</td>
                                        </tr>
                                        {meetingLink && (
                                            <tr>
                                                <td style={{ color: '#64748b' }}><strong>Toplantı Bağlantısı</strong></td>
                                                <td><a href={meetingLink} style={{ color: '#2563eb' }}>{meetingLink}</a></td>
                                            </tr>
                                        )}
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ backgroundColor: '#f8fafc', padding: '24px 32px', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
                                    <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
                                        © 2024 Benimle Paylaş. Tüm hakları saklıdır.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    );
};
