import socket
import threading

from dotenv import dotenv_values
from utils import *

config = dotenv_values(".env")

IP = config['IP']
PORT = int(config['PORT'])
SIZE = int(config['SIZE'])
FORMAT = config['FORMAT']

ADDR = (IP, PORT)
lock = threading.Lock()


class Server:

    def __init__(self):

        self.tcp_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.tcp_sock.bind(ADDR)

        self.udp_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.udp_sock.bind(ADDR)

        self.clients = []  # (conn, addr)

    def disconnect(self, client_sock, client_addr):

        with lock:
            self.clients.remove((client_sock, client_addr))
            client_sock.close()
            print(f"Client {client_addr} disconnected.")

    def handle_tcp_client(self, client_sock, client_addr):

        with lock:
            self.clients.append((client_sock, client_addr))

        while True:

            try:

                json_data = client_sock.recv(SIZE).decode(FORMAT)
                user_name, msg = extract_json(json_data)

                if msg == "Q":
                    self.disconnect(client_sock, client_addr)
                    break

                data = {
                    'user_name': user_name,
                    'msg': msg
                }

                self.broadcast_tcp(client_sock, json.dumps(data))

            except ConnectionResetError:
                self.disconnect(client_sock, client_addr)
                break

    def handle_tcp(self):

            while True:

                conn, addr = self.tcp_sock.accept()
                print(f"New TCP connection: {addr} connected.")

                handle_client_thread = threading.Thread(target=self.handle_tcp_client, args=(conn, addr))
                handle_client_thread.start()

    def broadcast_tcp(self, sender_sock, json_data):

        with lock:
            for client_sock, client_addr in self.clients:
                if client_sock != sender_sock:
                    client_sock.send(json_data.encode(FORMAT))

    def broadcast_udp(self, sender_addr, json_data):

        with lock:
            for client_sock, client_addr in self.clients:
                if client_addr != sender_addr:
                    self.udp_sock.sendto(json_data.encode(FORMAT), client_addr)

    def handle_udp(self):
        while True:
            json_data, addr = self.udp_sock.recvfrom(SIZE)
            self.broadcast_udp(addr, json_data.decode(FORMAT))

    def start(self):

        self.tcp_sock.listen()
        print(f"Server is listening on {IP}:{PORT}")

        handle_tcp_thread = threading.Thread(target=self.handle_tcp)
        handle_tcp_thread.start()

        handle_udp_thread = threading.Thread(target=self.handle_udp)
        handle_udp_thread.start()


Server().start()
