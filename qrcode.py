import qrcode

url = f"https://yourapp.com/verify/{auth_id}"
img = qrcode.make(url)
img.save("kimono_qr.png")
