from flask import render_template

@app.route('/login', methods=['GET'])
def login_page():
    # Render the login or sign-in page
    return render_template('login.html')
