from chrome.main import process_telegram_login, process_telegram_contact_to_two_w, process_telegram_contact_to_three_w
from chrome.main_p import process_telegram_login, process_telegram_contact_to_two_p, process_telegram_contact_to_three_p
from chrome.emoji import process_telegram_contact_to_emoji
import socket
import json

try:
    ip = "127.0.0.1"
    port = 2005
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((ip, port))
    server.listen(port)  # Server config

    def start_server():
            while True:
                try:
                    # Track requests
                    clinet_socket, address = server.accept()
                    data = clinet_socket.recv(1024).decode("utf-8")
                    res_content = data_processing(data)
                    clinet_socket.send(res_content)
                    shutdown_server(clinet_socket)

                except KeyboardInterrupt as e:
                    # If close the connect in console
                    print("server: close server")
                    shutdown_server(clinet_socket)

                except Exception as e:
                    # If close the connect in console
                    shutdown_server(clinet_socket)

    def data_processing(response_data):
        # Headers
        headers_ok = "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\n\r\n".encode(
            "utf-8")
        headers_fail = "HTTP/1.1 400 FAIl\r\nContent-Type: application/json; charset=utf-8\r\n\r\n".encode(
            "utf-8")
        # Send response
        try:
            print(response_data)
            s = response_data.splitlines()
            data = json.loads(s[-1])
            funct = data["funct"]
            print(funct)

            if funct == 'process_telegram_login':
                process_telegram_login()
            elif funct == 'process_telegram_contact_to_two_w':
                process_telegram_contact_to_two_w()
            elif funct == 'process_telegram_contact_to_three_w':
                process_telegram_contact_to_three_w()
            elif funct == 'process_telegram_contact_to_two_p':
                process_telegram_contact_to_two_p()
            elif funct == 'process_telegram_contact_to_three_p':
                process_telegram_contact_to_three_p()
            elif funct == 'process_telegram_contact_to_emoji':
                process_telegram_contact_to_emoji()
            return headers_ok

        except IndexError:
            print("server-req: Fail IndexError")
            return headers_fail


    def shutdown_server(client_socket):
        client_socket.shutdown(socket.SHUT_WR)

    start_server()
    
except KeyboardInterrupt:
    print("shutting down the server")
