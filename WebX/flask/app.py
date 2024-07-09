from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome Home!"

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        return render_template('success.html', name=name)
    return render_template('contact.html')

user1_portfolio = {
    'name': 'Preeti',
}

user2_portfolio = {
    'name': 'Anna',
}

@app.route('/phome')
def index():
    return render_template('phome.html')

@app.route('/user1')
def user1():
    return render_template('portfolio.html', user=user1_portfolio)

@app.route('/user2')
def user2():
    return render_template('portfolio.html', user=user2_portfolio)


if __name__ == '__main__':
    app.run(debug=True)