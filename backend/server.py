import json
import os
from groq import Groq
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Groq Free API - Llama 3
client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))

# Full menu for the AI to reference
MENU = [
    {"id": "p1", "name": "Spicy Classic Margherita", "price": 12.99, "category": "Pizza"},
    {"id": "p2", "name": "BBQ Chicken Supreme", "price": 14.99, "category": "Pizza"},
    {"id": "p3", "name": "Truffle Mushroom", "price": 13.99, "category": "Pizza"},
    {"id": "d1", "name": "Classic Tiramisu", "price": 6.99, "category": "Desserts"},
    {"id": "d2", "name": "Matcha Lava Cake", "price": 7.99, "category": "Desserts"},
    {"id": "c1", "name": "Vietnamese Iced Coffee", "price": 4.50, "category": "Coffee"},
    {"id": "c2", "name": "Matcha Latte", "price": 5.00, "category": "Coffee"},
    {"id": "s1", "name": "Garlic Bread", "price": 3.99, "category": "Sides"},
]

SYSTEM_PROMPT = """You are a premium AI restaurant assistant.
The user speaks their order and you must respond in valid JSON only.

Available menu items:
""" + json.dumps(MENU, indent=2) + """

Rules:
- If the user wants to add an item, respond: {"action": "add", "item_id": "<id>", "message": "<friendly confirmation>"}
- If the user wants to remove an item, respond: {"action": "remove", "item_id": "<id>", "message": "<friendly message>"}
- If the user asks a question, respond: {"action": "none", "message": "<helpful answer>"}
- If unclear, respond: {"action": "none", "message": "<ask for clarification>"}
- Respond ONLY with valid JSON. No markdown. No extra text."""

@app.route('/menu', methods=['GET'])
def get_menu():
    return jsonify(MENU)

@app.route('/ai', methods=['POST'])
def handle_ai():
    data = request.json
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({"action": "none", "message": "I didn't catch that. Could you say it again?"})

    try:
        chat = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            temperature=0.3,
            max_tokens=200,
        )

        raw = chat.choices[0].message.content.strip()

        # Strip markdown code blocks if model wraps response
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:].strip()

        result = json.loads(raw)

        # Attach full item details for 'add' actions
        if result.get("action") == "add":
            item_id = result.get("item_id")
            item = next((m for m in MENU if m["id"] == item_id), None)
            if item:
                result["item"] = item

        return jsonify(result)

    except Exception as e:
        print(f"Groq Error: {e}")
        return jsonify({
            "action": "none",
            "message": "I'm having trouble understanding that. Could you try again?"
        })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
