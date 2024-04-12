from time import sleep
import time as tm
import json
from SX127x.LoRa import *
from SX127x.board_config import BOARD
from firebase import firebase 
import collections
from collections import abc
collections.MutableMapping = abc.MutableMapping
from pyrebase import pyrebase
import socket

UDP_IP = "127.0.0.54"
UDP_PORT= 8000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
config = {
  "apiKey": "ObjdFhG0sNikafsOsUW370Xw6dQgq0pXmsw0BYLF",
  "authDomain": "mantiswavelora.firebaseapp.com",
  "databaseURL": "https://mantiswavelora-default-rtdb.firebaseio.com",
  "storageBucket": "mantiswavelora.appspot.com"
}
firebase = pyrebase.initialize_app(config)
#firebase.initializeApp(con);
db = firebase.database()
BOARD.setup()


class LoRaRcvCont(LoRa):

    def _init_(self, verbose=False):
        super(LoRaRcvCont, self)._init_(verbose)
        self.set_mode(MODE.SLEEP)
        self.set_dio_mapping([0] * 6)
        Available_nodes= []
    def start(self):
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)
        self.connectedDevices = 0
        self.connected_1 = 0
        self.connected_2 = 0
        self.connected_3 = 0
        self.connected_4 = 0
        self.connected_5 = 0
        self.connected_6 = 0
        self.connected_7 = 0
        self.connected_8 = 0
        self.time_1 = 1704538252.933027
        self.time_2 = 1704538252.933027
        self.time_3 = 1704538252.933027
        self.time_4 = 1704538252.933027
        self.time_5 = 1704538252.933027
        self.time_6 = 1704538252.933027
        self.time_7 = 1704538252.933027
        self.time_8 = 1704538252.933027
        self.time_f = 1704538252.933027
        self.lora_data ={}
        self.lora_data["sensor_id"]= [1,2,3,4,5,6,7,8]
        print("Line 58: ", self.lora_data)  
        while True:
            sleep(0.5)
            rssi_value = self.get_rssi_value()
            status = self.get_modem_status()
            sys.stdout.flush()
            if (tm.time() - self.time_f) > 5:
            	self.lora_data["sensor_id"]= []
                self.connectedDevices = 0
                self.connected_1 = 0
                self.connected_2 = 0
                self.connected_3 = 0
                self.connected_4 = 0
                self.connected_5 = 0
                self.connected_6 = 0
                self.connected_7 = 0
                self.connected_8 = 0
            print("Line No 66: ",self.lora_data)
            json_data = json.dumps(self.lora_data).encode('utf-8')
            sock.sendto(json_data, (UDP_IP, UDP_PORT))
    def on_rx_done(self):
        print ("\nReceived: ")
        self.clear_irq_flags(RxDone=1)
        payload = self.read_payload(nocheck=True)
        #print (bytes(payload).decode("utf-8",'ignore'))
        data = bytes(payload).decode("utf-8",'ignore')
        print (data)
        node_id= (data[0:2])
        temp = (data[2:7])
        humidity = (data[7:12])
        light_intensity = (data[12:18])
        #node_id = (data[0:2])
        #temp = "43"
        #humidity = "78"
        print("Node_ID:")
        print(node_id, type(node_id))
        print ("Temperature:")
        print (temp)
        print ("Humidity:")
        print (humidity)
        print ("Light Intensity:")
        print (light_intensity)
        if node_id == "01":			
            
            self.time_1= tm.time()
            
            if self.connected_1==0:
                self.lora_data["sensor_id"].append("01")
                 
                #print(self.lora_data)
                self.connectedDevices +=1 
                self.connected_1 = 1 
        if node_id == "02":
            self.time_2= tm.time()
            if self.connected_2==0:
                self.lora_data["sensor_id"].append("02")
                 
                #print(self.lora_data)
                self.connectedDevices +=1
                self.connected_2 = 1
        if node_id == "03":
            self.time_3= tm.time()
            if self.connected_3==0:
                self.lora_data["sensor_id"].append("03")
                             
                self.connectedDevices +=1
                self.connected_3 = 1
        if node_id == "04":
            self.time_4= tm.time()
            if self.connected_4==0:
                self.lora_data["sensor_id"].append("04")
                             
                self.connectedDevices +=1 
                self.connected_4 = 1 
        if node_id == "05":
            self.time_5= tm.time()
            if self.connected_5==0:
                self.lora_data["sensor_id"].append("05")
                            
                self.connectedDevices +=1
                self.connected_5 = 1
        if node_id == "06":
            self.time_6= tm.time()
            if self.connected_6==0:
                self.lora_data["sensor_id"].append("06")
                            
                self.connectedDevices +=1
                self.connected_6 = 1
        if node_id == "07":
            self.time_7= tm.time()
            if self.connected_7==0:
                self.lora_data["sensor_id"].append("07")
                             
                self.connectedDevices +=1
                self.connected_7 = 1
        if node_id == "08":
            self.time_8= tm.time()
            if self.connected_8==0:
                self.lora_data["sensor_id"].append("08")
                             
                self.connectedDevices +=1
                self.connected_8 = 1
        self.time_f = tm.time()
        if(self.time_f - self.time_1)> 5 and self.connected_1 == 1:
            self.lora_data["sensor_id"].remove("01")
            s       
            self.connected_1 = 0
            self.connectedDevices -=1
        if(self.time_f - self.time_2)> 5 and self.connected_2 == 1:
            self.lora_data["sensor_id"].remove("02")
            
            self.connected_2 = 0
            self.connectedDevices -=1
        if(self.time_f - self.time_3)> 5 and self.connected_3 == 1:
            self.lora_data["sensor_id"].remove("03")
                    
            self.connected_3 = 0
            self.connectedDevices -=1
        if(self.time_f - self.time_4)> 5 and self.connected_4 == 1:
            self.lora_data["sensor_id"].remove("04")
                    
            self.connected_4 = 0
            self.connectedDevices -=1
        if(self.time_f - self.time_5)> 5 and self.connected_5 == 1:
            self.lora_data["sensor_id"].remove("05")
            
            self.connected_5 = 0
            self.connectedDevices -=1
        if(self.time_f - self.time_6)> 5 and self.connected_6 == 1:
            self.lora_data["sensor_id"].remove("06")
                   
            self.connected_6 = 0
            self.connectedDevices -=1
        if(self.time_f - self.time_7)> 5 and self.connected_7 == 1:
            self.lora_data["sensor_id"].remove("07")
                   
            self.connected_7 = 0
            self.connectedDevices -=1
        if(self.time_f - self.time_8)> 5 and self.connected_8 == 1:
            self.lora_data["sensor_id"].remove("08")
                   
            self.connected_8 = 0
            self.connectedDevices -=1
      
        data = {
            
                "Node": node_id,
                "Timestamp":str(tm.time()), 
                "Temperature": temp,
                "Humidity": humidity,
                "Light Intensity": light_intensity,
 	    }
        print("Line 172: ", self.lora_data)
        json_data = json.dumps(self.lora_data).encode('utf-8')
        sock.sendto(json_data, (UDP_IP, UDP_PORT))
        db.child("raspi").child("1-set").set(data)
        db.child("raspi").child("2-push").push(data)
        self.set_mode(MODE.SLEEP)
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)
lora = LoRaRcvCont(verbose=False)
lora.set_mode(MODE.STDBY)
#  Medium Range  Defaults after init are 434.0MHz, Bw = 125 kHz, Cr = 4/5, Sf = 128chips/symbol, CRC on 13 dBm
lora.set_pa_config(pa_select=1)
try:
    lora.start()
except KeyboardInterrupt:
    sys.stdout.flush()
    print ("")
    sys.stderr.write("KeyboardInterrupt\n")
finally:
    sys.stdout.flush()
    print ("")
    lora.set_mode(MODE.SLEEP)
    BOARD.teardown()
