import * as crypto from 'crypto';

/**
 * Kriptografik olarak güvenli random token üretir
 */
export function generateToken(length = 32): string {
    return crypto.randomBytes(length).toString('hex');
}
