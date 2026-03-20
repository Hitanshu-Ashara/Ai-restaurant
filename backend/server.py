from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Premium Menu Data
MENU_DATA = [
    {"id": "p1", "name": "Spicy Classic Margherita", "price": 12.99, "category": "Pizza"},
    {"id": "d1", "name": "Classic Tiramisu", "price": 6.99, "category": "Desserts"},
    {"id": "c1", "name": "Vietnamese Iced Coffee", "price": 4.50, "category": "Coffee"}
]

@app.route('/menu', methods=['GET'])
def get_menu():
    return jsonify(MENU_DATA)

@app.route('/ai', methods=['POST'])
def handle_ai_query():
    data = request.json
    user_msg = data.get('message', '').lower()
    
    # Process order intent and entity extraction
    found_item = next((item for item in MENU_DATA if item['name'].lower() in user_msg), None)
    
    if found_item:
        return jsonify({
            'message': f"Great! Added the {found_item['name']} to your order.",
            'action': {'type': 'add', 'item': found_item}
        })
    
    return jsonify({
        'message': "I'm sorry, I'm still learning. Try 'Add a Spicy Margherita'.",
        'action': {'type': 'none'}
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
