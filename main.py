import socket
import json
from chrome.main import process_telegram_login, process_telegram_contact

def start_server():
    # Track requests
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('localhost', 8000))  # Replace with the appropriate address
    server.listen(1)
    client_socket, address = server.accept()

    clinet_socket = None  # Declare and initialize the variable

    while True:
        try:
            data = client_socket.recv(1024).decode("utf-8")
            res_content = data_processing(data)
            print("server started")
            client_socket.send(res_content)
            shutdown_server(client_socket)

        except KeyboardInterrupt:
            # If the connection is closed from the console
            print("server: close server")
            shutdown_server(client_socket)

        except Exception as e:
            print("server: Exception occurred -", str(e))
            shutdown_server(client_socket)


def data_processing(response_data):
    # Headers
    headers_ok = "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\n\r\n".encode(
        "utf-8")
    headers_fail = "HTTP/1.1 400 FAIL\r\nContent-Type: application/json; charset=utf-8\r\n\r\n".encode(
        "utf-8")
    
    # Send response
    try:
        s = response_data.splitlines()
        data = json.loads(s[-1])
        funct = data["funct"]
        
        if funct == 'process_telegram_contact':
            process_telegram_contact()
        elif funct == 'process_telegram_login':
            process_telegram_login()
        elif funct == 'start_server':
            start_server()

    except IndexError:
        print("server-req: Fail IndexError")
        return headers_fail


def shutdown_server(client_socket):
    if client_socket:
        client_socket.shutdown(socket.SHUT_WR)
        # Close the connection with the client

start_server()
