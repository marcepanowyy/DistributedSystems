import socket
import threading
import struct

from dotenv import dotenv_values
from faker import Faker
from utils import *

config = dotenv_values(".env")

IP = config['IP']
PORT = int(config['PORT'])
SIZE = int(config['SIZE'])
FORMAT = config['FORMAT']
MULTICAST_GROUP = config['MULTICAST_GROUP']
MULTICAST_PORT = int(config['MULTICAST_PORT'])

fake = Faker()
ADDR = (IP, PORT)
MULTICAST_ADDR = (MULTICAST_GROUP, MULTICAST_PORT)


class Client:

    def __init__(self):

        self.user_name = fake.user_name()

        self.tcp_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.tcp_sock.connect(ADDR)

        self.udp_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.udp_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.udp_sock.bind(self.tcp_sock.getsockname())
        self.udp_sock.connect(ADDR)

        self.multicast_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.multicast_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.multicast_sock.bind(('', MULTICAST_PORT))
        mult_req = struct.pack("4sl", socket.inet_aton(MULTICAST_GROUP), socket.INADDR_ANY)
        self.multicast_sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mult_req)

    def disconnect(self):
        print("Leaving the chat...")
        self.tcp_sock.close()
        self.udp_sock.close()
        self.multicast_sock.close()

    def listen(self, sock, connection_type):
        while True:
            try:
                data = sock.recv(SIZE).decode(FORMAT)
                user_name, msg = extract_json(data)
                print(f'[{connection_type}] {user_name}: {msg}')
            except:
                break

    def listen_tcp(self):
        self.listen(self.tcp_sock, "TCP")

    def listen_udp(self):
        self.listen(self.udp_sock, "UDP")

    def listen_multicast(self):
        self.listen(self.multicast_sock, "MULTICAST")

    def start(self):

        print("\nYou are connected to chat as:", self.user_name + "\n")

        listen_tcp_thread = threading.Thread(target=self.listen_tcp)
        listen_tcp_thread.start()

        listen_udp_thread = threading.Thread(target=self.listen_udp)
        listen_udp_thread.start()

        listen_multicast_thread = threading.Thread(target=self.listen_multicast)
        listen_multicast_thread.start()

        while True:

            try:

                user_input = input()

                match user_input:

                    case "R":
                        json_data = to_json(self.user_name, fake.sentence())
                        self.tcp_sock.send(json_data.encode(FORMAT))

                    case "U":
                        json_data = to_json(self.user_name, read_ascii_art())
                        self.udp_sock.sendto(json_data.encode(FORMAT), ADDR)

                    case "M":
                        json_data = to_json(self.user_name, read_ascii_art())
                        self.multicast_sock.sendto(json_data.encode(FORMAT), MULTICAST_ADDR)

                    case "Q":
                        json_data = to_json(self.user_name, user_input)
                        self.tcp_sock.send(json_data.encode(FORMAT))
                        self.disconnect()
                        break

                    case _:
                        json_data = to_json(self.user_name, user_input)
                        self.tcp_sock.send(json_data.encode(FORMAT))

            except (EOFError, KeyboardInterrupt):

                self.disconnect()
                break

        print("You have left the chat.")


Client().start()
