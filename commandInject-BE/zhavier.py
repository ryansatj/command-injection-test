import sys
import base64

def xor_encrypt_decrypt(text, key):
    # XOR each character with the key
    return ''.join(chr(ord(c) ^ ord(key[i % len(key)])) for i, c in enumerate(text))

def encode_base64(text):
    # Encode text to Base64
    return base64.b64encode(text.encode()).decode()

def decode_base64(encoded_text):
    # Decode text from Base64
    return base64.b64decode(encoded_text.encode()).decode()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: py file.py [text] [encryption_key]")
        print("Encrypt: py file.py [plain_text] [key]")
        print("Decrypt: py file.py [encrypted_base64] [key]")
        sys.exit(1)

    input_text = sys.argv[1]
    encryption_key = sys.argv[2]

    try:
        # Check if the input is Base64 (encrypted)
        decoded_text = decode_base64(input_text)
        # If successful, it means we are decrypting
        decrypted_xor = xor_encrypt_decrypt(decoded_text, encryption_key)
        print(decrypted_xor)
    except Exception:
        # If decoding fails, we are encrypting
        xor_result = xor_encrypt_decrypt(input_text, encryption_key)
        encrypted_text = encode_base64(xor_result)
        print(f"Encrypted text: {encrypted_text}")
