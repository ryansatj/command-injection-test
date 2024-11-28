import sys

# Pastikan ada 1 argumen yang diberikan
if len(sys.argv) != 2:
    print("Usage: python calculator.py <number>")
    sys.exit(1)

try:
    # Ambil parameter input dan konversi menjadi integer
    number = float(sys.argv[1])
    
    # Tambahkan 2 ke input
    result = number + 2
    
    # Tampilkan hasil
    print(f"Result: {number} + 2 = {result}")

except ValueError:
    print("Please provide a valid number.")
