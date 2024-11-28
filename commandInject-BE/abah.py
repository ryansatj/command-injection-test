import sys
import base64

def xor_encrypt_decrypt(text, key):
    # XOR setiap karakter dengan kunci
    xor_result = ''.join(chr(ord(c) ^ ord(key[i % len(key)])) for i, c in enumerate(text))
    return xor_result

def encode_base64(text):
    # Encode teks ke Base64 agar tetap berupa karakter
    return base64.b64encode(text.encode()).decode()

def decode_base64(encoded_text):
    # Decode teks dari Base64 ke string asli
    return base64.b64decode(encoded_text.encode()).decode()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: py file.py [input] [encryption_key]")
        sys.exit(1)

    input_text = sys.argv[1]
    encryption_key = sys.argv[2]

    # Proses XOR untuk enkripsi
    xor_result = xor_encrypt_decrypt(input_text, encryption_key)

    # Encode hasil XOR ke Base64
    encrypted_text = encode_base64(xor_result)
    print(encrypted_text)

    # Decode dan decrypt untuk memastikan simetri
    decrypted_xor = xor_encrypt_decrypt(decode_base64(encrypted_text), encryption_key)
