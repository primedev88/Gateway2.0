from time import sleep, time
import json
import socket
from SX127x.LoRa import *
from SX127x.board_config import BOARD
from pyrebase import pyrebase

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
        self.connectedDevices = 0
        self.connected = {}
        self.node_times = [time()] * 8
        self.lora_data = {"devices": []}

    def start(self):
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)
        while True:
            self.remove_inactive_nodes()
            self.send_data_to_udp()
            sleep(1)

    def send_data_to_udp(self):
        json_data = json.dumps(self.lora_data).encode('utf-8')
        sock.sendto(json_data, (UDP_IP, UDP_PORT))

    def on_rx_done(self):
        self.clear_irq_flags(RxDone=1)
        payload = self.read_payload(nocheck=True)
        data = bytes(payload).decode("utf-8", 'ignore')
        print("\nReceived:", data)

        node_id = data[:2]
        temp = data[2:7]
        humidity = data[7:12]
        light_intensity = data[12:18]
        
        if not node_id.isdigit():
            print("Invalid node_id:", node_id)
            return  # Skip processing invalid node_id

    
        print("Node_ID:", node_id)
        print("Temperature:", temp)
        print("Humidity:", humidity)
        print("Light Intensity:", light_intensity)
        receiveTime = time.time()
        existing_device = next((device for device in self.lora_data["devices"] if device["id"] == node_id), None)

        if existing_device:
            # Update existing device data
            existing_device.update({
                "id": node_id,
                "timestamp": str(receiveTime),
                "temperature": temp,
                "humidity": humidity,
                "lightIntensity": light_intensity
            })
        else:
            # Add new device data
            self.lora_data["devices"].append({
                "id": node_id,
                "timestamp": str(receiveTime),
                "temperature": temp,
                "humidity": humidity,
                "lightIntensity": light_intensity
            })

        self.node_times[int(node_id) - 1] = receiveTime

        self.set_mode(MODE.SLEEP)
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)

    def remove_inactive_nodes(self):
        current_time = time.time()
        inactive_nodes = [node_id for node_id, last_update_time in enumerate(self.node_times, start=1) if current_time - last_update_time > 5]
        for node_id in inactive_nodes:
            self.remove_node_data(node_id)

    def remove_node_data(self, node_id):
        self.lora_data["devices"] = [device for device in self.lora_data["devices"] if device["id"] != str(node_id)]

# Rest of the code remains the same


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
