# # utils/auth_utils.py
# import uuid
# import qrcode
#
# def generate_auth_id():
#     """Generate a unique authenticity ID"""
#     return "AUTH-" + str(uuid.uuid4())[:8]
#
# def generate_qr(auth_id, filename=None):
#     """Generate QR code pointing to the verification endpoint"""
#     url = f"http://127.0.0.1:8000/api/verify/{auth_id}"
#     img = qrcode.make(url)
#     if filename:
#         img.save(filename)
#     return img
