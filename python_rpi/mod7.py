from time import sleep, time
import json
from SX127x.LoRa import *
from SX127x.board_config import BOARD
from pyrebase import pyrebase
import socket

UDP_IP = "127.0.0.54"
UDP_PORT = 8000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
config = {
  "apiKey": "ObjdFhG0sNikafsOsUW370Xw6dQgq0pXmsw0BYLF",
  "authDomain": "mantiswavelora.firebaseapp.com",
  "databaseURL": "https://mantiswavelora-default-rtdb.firebaseio.com",
  "storageBucket": "mantiswavelora.appspot.com"
}
firebase = pyrebase.initialize_app(config)
db = firebase.database()
BOARD.setup()

class LoRaRcvCont(LoRa):

    def __init__(self, verbose=False):
        super(LoRaRcvCont, self).__init__(verbose)
        self.set_mode(MODE.SLEEP)
        self.set_dio_mapping([0] * 6)
        self.node_data = {}

    def start(self):
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)
        while True:
            sleep(2)
            self.check_inactive_nodes()
            self.send_udp_data()

    def on_rx_done(self):
        self.clear_irq_flags(RxDone=1)
        payload = self.read_payload(nocheck=True)
        data = bytes(payload).decode("utf-8", 'ignore')
        
        node_id = data[0:2]
        temp = data[2:7]
        humidity = data[7:12]
        light_intensity = data[12:18]
        
        if node_id.isdigit():
            print("Node_ID:", node_id)
            print("Temperature:", temp)
            print("Humidity:", humidity)
            print("Light Intensity:", light_intensity)

            self.update_node_data(node_id, temp, humidity, light_intensity)

    def update_node_data(self, node_id, temp, humidity, light_intensity):
        timestamp = str(time())
        self.node_data[node_id] = {
            "timestamp": timestamp,
            "temperature": temp,
            "humidity": humidity,
            "lightIntensity": light_intensity
        }

    def check_inactive_nodes(self):
        current_time = time()
        inactive_nodes = [node_id for node_id, data in self.node_data.items() if current_time - float(data["timestamp"]) > 5]
        for node_id in inactive_nodes:
            del self.node_data[node_id]

    def send_udp_data(self):
        devices = [{"node_id": node_id, **data} for node_id, data in self.node_data.items()]
        data_to_send = {"devices": devices}
        json_data = json.dumps(data_to_send).encode('utf-8')
        sock.sendto(json_data, (UDP_IP, UDP_PORT))

lora = LoRaRcvCont(verbose=False)
lora.set_mode(MODE.STDBY)
lora.set_pa_config(pa_select=1)

try:
    lora.start()
except KeyboardInterrupt:
    print("\nKeyboardInterrupt")
finally:
    lora.set_mode(MODE.SLEEP)
    BOARD.teardown()
