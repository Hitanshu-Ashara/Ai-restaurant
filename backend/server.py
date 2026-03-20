import json
import os
import re
from dotenv import load_dotenv
from groq import Groq
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

# Groq Free API
client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))

# ─── Parse menu.txt ───────────────────────────────────────────────────────────
def parse_menu():
    menu_path = os.path.join(os.path.dirname(__file__), '..', 'menu.txt')
    items = []
    item_id = 1
    category = "Other"

    category_emojis = {
        "pizza": "Pizza", "bread": "Starters", "starter": "Starters",
        "dip": "Dips", "salad": "Salads", "coffee": "Coffee",
        "frappe": "Frappes & Shakes", "shake": "Frappes & Shakes",
        "matcha": "Matcha", "refresh": "Refreshers", "hot drink": "Hot Drinks",
        "dessert": "Desserts", "cookie": "Cookies", "iced tea": "Iced Tea",
        "merch": "Merchandise", "add-on": "Add-ons"
    }

    try:
        with open(menu_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue

                # Detect category headers (lines with emoji or ALL CAPS-ish)
                if any(e in line for e in ['🍕','🥖','🥣','🥗','☕','🧋','🍵','🍹','🍫','🍰','🍪','🧊','🛍️']):
                    label = re.sub(r'[^\w\s&]', '', line).strip().lower()
                    for key, val in category_emojis.items():
                        if key in label:
                            category = val
                            break
                    continue

                # Match lines like "Item Name – ₹999"
                match = re.match(r'^(.+?)\s*[–-]\s*₹(\d+)', line)
                if match:
                    name = match.group(1).strip()
                    price = int(match.group(2))
                    items.append({
                        "id": f"item_{item_id}",
                        "name": name,
                        "price": price,
                        "category": category
                    })
                    item_id += 1
    except Exception as e:
        print(f"Menu parse error: {e}")

    return items

MENU = parse_menu()
MENU_TEXT = "\n".join([f"- {i['name']} ({i['category']}) ₹{i['price']} [id:{i['id']}]" for i in MENU])

SYSTEM_PROMPT = f"""You are a voice AI waiter at D&D Café. You take orders from customers or waiters.

Full Menu:
{MENU_TEXT}

Respond ONLY in valid JSON. No markdown, no extra text.

If user wants to add an item:
{{"action": "add", "item_id": "<id>", "message": "<friendly short confirmation in 1 sentence>"}}

If user wants to remove an item:
{{"action": "remove", "item_id": "<id>", "message": "<short message>"}}

If user asks what's on the menu or a question:
{{"action": "none", "message": "<helpful, short answer>"}}

If unclear:
{{"action": "none", "message": "<ask 1 short clarifying question>"}}
"""

# ─── Routes ────────────────────────────────────────────────────────────────────
@app.route('/menu', methods=['GET'])
def get_menu():
    return jsonify(MENU)

@app.route('/ai', methods=['POST'])
def handle_ai():
    data = request.json or {}
    user_message = data.get('message', '').strip()

    if not user_message:
        return jsonify({"action": "none", "message": "I didn't catch that. Please try again."})

    try:
        chat = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            temperature=0.2,
            max_tokens=200,
        )

        raw = chat.choices[0].message.content.strip()

        # Strip markdown fences if present
        if raw.startswith("```"):
            parts = raw.split("```")
            raw = parts[1] if len(parts) > 1 else raw
            if raw.startswith("json"):
                raw = raw[4:].strip()

        result = json.loads(raw)

        # Attach full item details for add/remove actions
        if result.get("action") in ("add", "remove"):
            item_id = result.get("item_id")
            item = next((m for m in MENU if m["id"] == item_id), None)
            if item:
                result["item"] = item

        return jsonify(result)

    except Exception as e:
        print(f"AI Error: {e}")
        return jsonify({
            "action": "none",
            "message": "Sorry, I couldn't process that. Please try again."
        })

if __name__ == '__main__':
    print(f"Loaded {len(MENU)} menu items.")
    app.run(port=5000, debug=True)
