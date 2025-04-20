# backend/get_data.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import psycopg2
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/energy-usage")
def get_energy_usage():
    conn = psycopg2.connect(
        host=os.getenv("SUPABASE_HOST"),
        port=5432,
        database="postgres",
        user=os.getenv("SUPABASE_USER"),
        password=os.getenv("SUPABASE_PASSWORD"),
    )
    cur = conn.cursor()
    cur.execute("""
        SELECT device_name, room_name, rated_power, status, power_usage,
               power_source, time_on, timestamp, total_units
        FROM devices
        ORDER BY timestamp;
    """)
    rows = cur.fetchall()
    columns = [desc[0] for desc in cur.description]
    cur.close()
    conn.close()

    return [dict(zip(columns, row)) for row in rows]
