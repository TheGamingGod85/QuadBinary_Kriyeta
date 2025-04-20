from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler
from contextlib import asynccontextmanager
import random
import sqlite3
import json
import requests

app = FastAPI(title="Smart Energy Mock API")

DB_PATH = "mock_simulation.db"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# --- DATABASE SETUP ---

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS rooms (
        id TEXT PRIMARY KEY,
        name TEXT,
        total_units INTEGER DEFAULT 0
    )""")

    cur.execute("""
    CREATE TABLE IF NOT EXISTS devices (
        id TEXT PRIMARY KEY,
        name TEXT,
        room_id TEXT,
        rated_power INTEGER,
        status TEXT,
        time_on TEXT,
        power_usage INTEGER,
        total_units INTEGER DEFAULT 0,
        FOREIGN KEY(room_id) REFERENCES rooms(id)
    )""")

    cur.execute("""
    CREATE TABLE IF NOT EXISTS power_system_status (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        mains_power BOOLEAN,
        generator_power BOOLEAN,
        generator_capacity INTEGER,
        total_units INTEGER DEFAULT 0
    )""")

    cur.execute("""
    INSERT OR IGNORE INTO power_system_status (id, mains_power, generator_power, generator_capacity, total_units)
    VALUES (1, 1, 0, 2000, 0)
    """)

    conn.commit()
    conn.close()


init_db()

# --- MODELS ---

class Room(BaseModel):
    id: Optional[str] = None
    name: str

class Device(BaseModel):
    id: Optional[str] = None
    name: str
    room_id: str
    rated_power: int
    status: Optional[bool] = 0
    time_on: Optional[str] = "00:00:00"
    power_usage: Optional[int] = 0
    critical: Optional[bool] = 0

class PowerStatus(BaseModel):
    mains_power: bool
    generator_power: bool
    generator_capacity: int

class QuestionRequest(BaseModel):
    question: str

# --- HELPERS ---

def db_connection():
    return sqlite3.connect(DB_PATH)

def format_time(seconds: int) -> str:
    return str(timedelta(seconds=seconds))

# --- ENDPOINTS ---

@app.post("/rooms")
def add_room(room: Room):
    room.id = room.id or str(uuid4())
    with db_connection() as conn:
        cur = conn.cursor()
        # Check if a room with the same name exists (case-insensitive)
        cur.execute("SELECT * FROM rooms WHERE LOWER(name) = LOWER(?)", (room.name,))
        existing = cur.fetchone()
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Room with this name already exists. Please choose a different name or add a number to make it unique."
            )
        cur.execute("INSERT INTO rooms (id, name) VALUES (?, ?)", (room.id, room.name))
        conn.commit()
    return room

@app.get("/rooms")
def list_rooms():
    with db_connection() as conn:
        cur = conn.cursor()
        cur.execute("SELECT id, name FROM rooms")
        rooms = cur.fetchall()
    return [{"id": r[0], "name": r[1]} for r in rooms]

@app.delete("/rooms/{room_id}")
def delete_room(room_id: str):
    with db_connection() as conn:
        cur = conn.cursor()
        # Delete devices associated with the room
        cur.execute("DELETE FROM devices WHERE room_id = ?", (room_id,))
        # Delete the room
        cur.execute("DELETE FROM rooms WHERE id = ?", (room_id,))
        conn.commit()
    return {"message": f"Room {room_id} and its associated devices deleted"}


@app.post("/devices")
def add_device(device: Device):
    device.id = device.id or str(uuid4())
    with db_connection() as conn:
        conn.execute("""
            INSERT INTO devices (id, name, room_id, rated_power, status, time_on, power_usage)
            VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (device.id, device.name, device.room_id, device.rated_power, device.status, device.time_on, device.power_usage))
        conn.commit()
    return device

@app.get("/devices")
def list_devices():
    with db_connection() as conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM devices")
        rows = cur.fetchall()
    return [
        {
            "id": d[0],
            "name": d[1],
            "room_id": d[2],
            "rated_power": d[3],
            "status": d[4],
            "time_on": d[5],
            "power_usage": d[6]
        } for d in rows
    ]

@app.put("/devices/{device_id}/status")
def update_device_status(device_id: str, status: dict):
    with db_connection() as conn:
        conn.execute(
            "UPDATE devices SET status = ? WHERE id = ?",
            (status["status"], device_id)
        )
        conn.commit()
    return {"device_id": device_id, "new_status": status["status"]}

@app.put("/devices/turn_off_all")
def turn_off_all_devices():
    with db_connection() as conn:
        cur = conn.cursor()
        cur.execute("UPDATE devices SET status = 'off', power_usage = 0, time_on = '00:00:00'")
        conn.commit()
    return {"message": "All devices have been turned off"}


@app.delete("/devices/{device_id}")
def delete_device(device_id: str):
    with db_connection() as conn:
        conn.execute("DELETE FROM devices WHERE id = ?", (device_id,))
        conn.commit()
    return {"message": f"Device {device_id} deleted"}

@app.put("/power/mains")
def toggle_mains(status: dict):
    with db_connection() as conn:
        conn.execute("UPDATE power_system_status SET mains_power = ? WHERE id = 1", (int(status["status"]),))
        conn.commit()
    return {"mains_power": status["status"]}

@app.put("/power/generator")
def toggle_generator(status: dict):
    with db_connection() as conn:
        conn.execute("""
            UPDATE power_system_status 
            SET generator_power = ?, generator_capacity = ? 
            WHERE id = 1""",
            (int(status["status"]), status["capacity"]))
        conn.commit()
    return {"generator_power": status["status"], "capacity": status["capacity"]}

@app.get("/energy/summary")
def energy_summary():
    with db_connection() as conn:
        cur = conn.cursor()

        cur.execute("SELECT id, name, total_units FROM rooms")
        rooms = cur.fetchall()

        cur.execute("SELECT id, name, total_units FROM devices")
        devices = cur.fetchall()

        cur.execute("SELECT total_units FROM power_system_status WHERE id = 1")
        total_system = cur.fetchone()[0]

    return {
        "rooms": [{"id": r[0], "name": r[1], "total_units": r[2]} for r in rooms],
        "devices": [{"id": d[0], "name": d[1], "total_units": d[2]} for d in devices],
        "system_total_units": total_system
    }

@app.get("/power/status")
def get_power_status():
    with db_connection() as conn:
        cur = conn.cursor()
        cur.execute("SELECT mains_power, generator_power, generator_capacity FROM power_system_status WHERE id = 1")
        row = cur.fetchone()
    return {"mains_power": bool(row[0]), "generator_power": bool(row[1]), "generator_capacity": row[2]}

import requests
import json
from fastapi import HTTPException, Body
from fastapi.responses import JSONResponse

@app.put("/devices/{device_id}/critical")
def set_critical(device_id: str, status: dict = Body(...)):
    SUPABASE_URL = os.environ.get("SUPABASE_URL") + f"/rest/v1/device_main?device_id=eq.{device_id}"
    SUPABASE_API_KEY = os.environ.get("SUPABASE_API_KEY")
    if not SUPABASE_URL or not SUPABASE_API_KEY:
        raise HTTPException(status_code=500, detail="Supabase URL or API key not set.")
    

    headers = {
        "Content-Type": "application/json",
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Prefer": "return=representation"
    }

    payload = {"critical": bool(status.get("critical", False))}

    print(f"\n>> PATCH to: {SUPABASE_URL}")
    print(f">> Payload: {payload}")
    print(f">> Headers: {headers}")

    try:
        response = requests.patch(SUPABASE_URL, headers=headers, data=json.dumps(payload))
        print(">> Response code:", response.status_code)
        print(">> Response text:", response.text)

        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        error_message = e.response.text if e.response else str(e)
        print("!! Supabase PATCH Error:", error_message)
        raise HTTPException(status_code=500, detail=error_message)

@app.get("/devices/check/{device_id}")
def check_device(device_id: str):
    SUPABASE_URL = f"https://ujbarelcmgynzdgalrmi.supabase.co/rest/v1/device_main?device_id=eq.{device_id}"
    SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYmFyZWxjbWd5bnpkZ2Fscm1pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTAwNDcxNywiZXhwIjoyMDYwNTgwNzE3fQ.ey25d1OqJ5n4K7mg71F8oKJdSSCXQGvMkZdGATySuiM"

    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}"
    }

    response = requests.get(SUPABASE_URL, headers=headers)
    return response.json()  # This should return the device info or an empty list if not found


PREV_DEVICE_STATE = {}  # In-memory cache

@app.put("/emergency")
def toggle_emergency(state: dict):
    emergency_active = state["emergency"]
    SUPABASE_URL = "https://ujbarelcmgynzdgalrmi.supabase.co/rest/v1/devices"
    SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYmFyZWxjbWd5bnpkZ2Fscm1pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTAwNDcxNywiZXhwIjoyMDYwNTgwNzE3fQ.ey25d1OqJ5n4K7mg71F8oKJdSSCXQGvMkZdGATySuiM"

    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        # Fetch all devices
        response = requests.get(SUPABASE_URL, headers=headers)
        response.raise_for_status()
        devices = response.json()

        updates = []

        if emergency_active:
            # Save current states and turn off non-critical devices
            for d in devices:
                PREV_DEVICE_STATE[d["device_id"]] = d["status"]
                if not d.get("critical"):
                    updates.append({
                        "device_id": d["device_id"],
                        "status": "off"
                    })
        else:
            # Restore states of all devices that were modified
            for device_id, old_status in PREV_DEVICE_STATE.items():
                updates.append({
                    "device_id": device_id,
                    "status": old_status
                })
            PREV_DEVICE_STATE.clear()

        if updates:
            patch_response = requests.patch(
                SUPABASE_URL,
                headers={**headers, "Prefer": "resolution=merge-duplicates"},
                data=json.dumps(updates)
            )
            patch_response.raise_for_status()

        return {"emergency": emergency_active, "affected_devices": len(updates)}

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))


simulation_active = False  # Flag to control simulation

@app.put("/simulation/toggle")
def toggle_simulation(status: dict):
    global simulation_active
    simulation_active = status["active"]
    return {"simulation_active": simulation_active}

@app.get("/simulate/devices")
def simulate_devices():
    global simulation_active

    if not simulation_active:
        return {"message": "Simulation is paused."}

    SUPABASE_URL = "https://ujbarelcmgynzdgalrmi.supabase.co/rest/v1/device_main"
    SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYmFyZWxjbWd5bnpkZ2Fscm1pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTAwNDcxNywiZXhwIjoyMDYwNTgwNzE3fQ.ey25d1OqJ5n4K7mg71F8oKJdSSCXQGvMkZdGATySuiM"

    with db_connection() as conn:
        cur = conn.cursor()
        cur.execute("""
            SELECT d.id, d.name, d.room_id, d.rated_power, d.status, d.time_on, d.power_usage, d.total_units, r.name 
            FROM devices d
            JOIN rooms r ON d.room_id = r.id
        """)
        devices = cur.fetchall()

        cur.execute("SELECT * FROM power_system_status WHERE id = 1")
        power = cur.fetchone()

    mains_on = bool(power[1])
    generator_on = bool(power[2])
    capacity = power[3]

    active_load = 0
    updated_devices = []

    for device in devices:
        id, name, room_id, rated_power, status, time_on, power_usage, total_units, room_name = device
        if status == "on":
            usage = random.randint(int(0.3 * rated_power), rated_power)
            power_source = "mains" if mains_on else "generator"

            if not mains_on and generator_on:
                if active_load + usage > capacity:
                    usage = 0
                    status = 0
                else:
                    active_load += usage
            elif not mains_on and not generator_on:
                usage = 0
                status = 0
            t = sum(int(x) * 60 ** i for i, x in enumerate(reversed(time_on.split(":")))) + 10
            time_on = format_time(t)

            total_units += usage
            total_units_kwh = round(total_units / 3600000, 4)  # kWh

            timestamp = datetime.utcnow().isoformat()

            updated_device = {
                "device_id": id,
                "device_name": name,
                "room_id": room_id,
                "room_name": room_name,
                "rated_power": rated_power,
                "status": status,
                "power_usage": usage,
                "power_source": power_source or "",
                "time_on": time_on,
                "timestamp": timestamp,
                "total_units": total_units_kwh,
                # "critical": 0,
            }

            updated_devices.append(updated_device)

        else:
            usage = 0
            time_on = "00:00:00"

        # Update database regardless of send
        with db_connection() as conn:
            cur = conn.cursor()

            if usage > 0:
                cur.execute("""
                    UPDATE devices 
                    SET total_units = total_units + ?, status = ?, time_on = ?, power_usage = ? 
                    WHERE id = ?
                """, (usage, status, time_on, usage, id))

                cur.execute("""
                    UPDATE rooms 
                    SET total_units = total_units + ? 
                    WHERE id = ?
                """, (usage, room_id))

                cur.execute("""
                    UPDATE power_system_status 
                    SET total_units = total_units + ? 
                    WHERE id = 1
                """, (usage,))
            else:
                cur.execute("""
                    UPDATE devices 
                    SET status = ?, time_on = ?, power_usage = ? 
                    WHERE id = ?
                """, (status, time_on, usage, id))

            conn.commit()


    # Send updated device data to Supabase
    headers = {
        "Content-Type": "application/json",
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Prefer": "return=minimal"
    }

    try:
        response = requests.post(SUPABASE_URL, headers=headers, data=json.dumps(updated_devices))
        response.raise_for_status()
        print(updated_devices)
    except requests.RequestException as e:
        print("Failed to sync with Supabase:", e)

    return updated_devices




# --- APSCHEDULER SETUP ---
scheduler = BackgroundScheduler()
scheduler.add_job(simulate_devices, 'interval', seconds=10)

@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.start()
    yield
    scheduler.shutdown()

app.router.lifespan_context = lifespan
