from time import sleep, time
import json
from pyrebase import pyrebase
import socket
from SX127x.LoRa import *
from SX127x.board_config import BOARD

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
        self.lora_data = {"sensor_id": []}
        self.connected_nodes = {}
        self.node_times = [time()] * 8  # Initialize with current time

    def start(self):
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)
        while True:
            sleep(0.5)
            if time() - self.lora_data.get("time_f", 0) > 5:
                self.reset_data()

            self.send_data_to_udp()

    def reset_data(self):
        self.lora_data["sensor_id"] = []
        self.connected_nodes = {}
        self.node_times = [time()] * 8
        self.lora_data["time_f"] = time()

    def send_data_to_udp(self):
        json_data = json.dumps(self.lora_data).encode('utf-8')
        sock.sendto(json_data, (UDP_IP, UDP_PORT))

    def on_rx_done(self):
        self.clear_irq_flags(RxDone=1)
        payload = self.read_payload(nocheck=True)
        data = payload.decode("utf-8", 'ignore')
        print("\nReceived:", data)

        node_id = data[:2]
        node_data = {
            "Temperature": data[2:7],
            "Humidity": data[7:12],
            "Light Intensity": data[12:18]
        }
        print("Node_ID:", node_id)

        self.process_node_data(node_id, node_data)

    def process_node_data(self, node_id, node_data):
        current_time = time()
        if node_id not in self.connected_nodes:
            self.connected_nodes[node_id] = current_time
            self.lora_data["sensor_id"].append(node_id)
        else:
            if current_time - self.connected_nodes[node_id] > 5:
                self.lora_data["sensor_id"].remove(node_id)
                del self.connected_nodes[node_id]

        self.node_times[int(node_id) - 1] = current_time

        self.lora_data.update(node_data)
        self.send_data_to_udp()
        db.child("raspi").child("1-set").set(node_data)
        db.child("raspi").child("2-push").push(node_data)

        self.set_mode(MODE.SLEEP)
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)


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
