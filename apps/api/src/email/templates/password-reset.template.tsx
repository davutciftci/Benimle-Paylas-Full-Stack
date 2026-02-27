import * as React from 'react';

interface PasswordResetEmailProps {
    userName: string;
    resetUrl: string;
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
    userName,
    resetUrl,
}) => {
    return (
        <html lang="tr">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Şifre Sıfırlama</title>
        </head>
        <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0 }}>
            <table width="100%" cellPadding={0} cellSpacing={0}>
                <tr>
                    <td align="center" style={{ padding: '40px 0' }}>
                        <table width="600" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <tr>
                                <td style={{ backgroundColor: '#2563eb', padding: '32px', textAlign: 'center' }}>
                                    <h1 style={{ color: '#ffffff', margin: 0, fontSize: '24px' }}>Benimle Paylaş</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '40px 32px' }}>
                                    <h2 style={{ color: '#1e293b', marginTop: 0 }}>Şifre Sıfırlama İsteği</h2>
                                    <p style={{ color: '#475569', lineHeight: '1.6' }}>
                                        Merhaba <strong>{userName}</strong>,
                                    </p>
                                    <p style={{ color: '#475569', lineHeight: '1.6' }}>
                                        Benimle Paylaş hesabınız için şifre sıfırlama talep ettiniz. Aşağıdaki butona tıklayarak şifrenizi sıfırlayabilirsiniz.
                                    </p>
                                    <p style={{ color: '#475569', lineHeight: '1.6' }}>
                                        Bu bağlantı <strong>1 saat</strong> geçerlidir.
                                    </p>
                                    <table width="100%" cellPadding={0} cellSpacing={0} style={{ margin: '32px 0' }}>
                                        <tr>
                                            <td align="center">
                                                <a
                                                    href={resetUrl}
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
                                                    Şifremi Sıfırla
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6' }}>
                                        Eğer bu isteği siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz. Hesabınız güvende olacaktır.
                                    </p>
                                    <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                                        Bağlantı çalışmıyorsa aşağıdaki URL'yi tarayıcınıza kopyalayın:
                                        <br />
                                        <span style={{ color: '#2563eb', wordBreak: 'break-all' }}>{resetUrl}</span>
                                    </p>
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
