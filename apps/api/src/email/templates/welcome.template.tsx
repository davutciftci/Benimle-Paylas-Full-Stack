import * as React from 'react';

interface WelcomeEmailProps {
    userName: string;
    loginUrl?: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
    userName,
    loginUrl = 'http://localhost:5173/login',
}) => {
    return (
        <html lang="tr">
        <head>
            <meta charSet="UTF-8" />
            <title>Hoş Geldiniz</title>
        </head>
        <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0 }}>
            <table width="100%" cellPadding={0} cellSpacing={0}>
                <tr>
                    <td align="center" style={{ padding: '40px 0' }}>
                        <table width="600" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <tr>
                                <td style={{ backgroundColor: '#2563eb', padding: '32px', textAlign: 'center' }}>
                                    <h1 style={{ color: '#ffffff', margin: 0, fontSize: '24px' }}>Benimle Paylaş</h1>
                                    <p style={{ color: '#bfdbfe', margin: '8px 0 0' }}>Psikolojik Danışmanlık Platformu</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '40px 32px' }}>
                                    <h2 style={{ color: '#1e293b', marginTop: 0 }}>Hoş Geldiniz! 🎉</h2>
                                    <p style={{ color: '#475569', lineHeight: '1.6' }}>
                                        Merhaba <strong>{userName}</strong>,
                                    </p>
                                    <p style={{ color: '#475569', lineHeight: '1.6' }}>
                                        Benimle Paylaş ailesine katıldığınız için teşekkür ederiz! Platformumuzda uzman psikologlarla kolayca randevu alabilir, online seans gerçekleştirebilir ve psikolojik testlere erişebilirsiniz.
                                    </p>
                                    <table width="100%" cellPadding={0} cellSpacing={0} style={{ margin: '32px 0' }}>
                                        <tr>
                                            <td align="center">
                                                <a
                                                    href={loginUrl}
                                                    style={{
                                                        display: 'inline-block',
                                                        backgroundColor: '#2563eb',
                                                        color: '#ffffff',
                                                        padding: '14px 32px',
                                                        borderRadius: '6px',
                                                        textDecoration: 'none',
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Platformu Keşfet
                                                </a>
                                            </td>
                                        </tr>
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
