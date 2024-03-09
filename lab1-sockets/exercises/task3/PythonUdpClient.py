import socket

serverIP = "127.0.0.1"
serverPort = 9008
msg_bytes = (300).to_bytes(4, byteorder='little')

print('PYTHON UDP KLIENT')
client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
client.sendto(msg_bytes, (serverIP, serverPort))

response, server_address = client.recvfrom(1024)
received_value = int.from_bytes(response, byteorder='little')

print("Received value:", received_value)



